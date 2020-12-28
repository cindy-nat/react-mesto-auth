import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteSubmitPopupOpen, setDeleteSubmitPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({isOpen: false, link:'', name:''});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [cardIdToDelete, setCardIdToDelete] = React.useState(null);

  //получение данных
  React.useEffect(()=>{
    Promise.all([api.getInfo(), api.getCards()])
      .then(info=>{
        const [userInfo, cards] = info;
        setCurrentUser(userInfo);
        setCards(cards);
      })
      .catch(err => console.log(err))},[]);

  //функции для установки состояния открытого попапа
    function handleEditAvatarClick () {
    setEditAvatarPopupOpen(true);
  }
    function handleEditProfileClick (){
    setEditProfilePopupOpen(true);
  }
    function handleAddPlaceClick () {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick({name, link}) {
      setSelectedCard({isOpen:true, name:name, link: link})
  }

  //функция закрытия попапов
  function closeAllPopups () {
      setEditAvatarPopupOpen(false);
      setAddPlacePopupOpen(false);
      setEditProfilePopupOpen(false);
      setDeleteSubmitPopupOpen(false);
      setSelectedCard({isOpen:false, link: "",name: ""});
      setCardIdToDelete(null);
  }

  //функция отвечающая за апдейт данных у пользователя
   function handleUpdateUser({name, about}) {
   setLoading(true);
    api.setInfo({name, about})
      .then((info) => {
      setCurrentUser(info);
      closeAllPopups();
  })
      .catch(err => console.log(err))
      .finally(()=>setLoading(false))
   }

   //функция для обновления аватара на сервере
   function handleUpdateAvatar (avatarLink) {
     setLoading(true);
     api.setAvatar(avatarLink)
      .then((info) => {
        setCurrentUser(info);
        closeAllPopups();
      })
      .catch(err => console.log(err))
       .finally(()=>setLoading(false))
   }

   //функция для лайка карточек
  function handleCardLike (card) {
    const isLiked = card.likes.some(like => like._id ===currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard)=>{
      const newCards = cards.map(cardItem=>cardItem._id === card._id ? newCard : cardItem);
      setCards(newCards);
    })
      .catch(err => console.log(err))
  }

  //функция для открытия попапа подтверждения удаления, передача в ней ид карточки
  function handleCardDelete (cardId) {
      setCardIdToDelete(cardId);
      setDeleteSubmitPopupOpen(true);
  }

  //функция для удаления карточки при submit
  function handleCardDeleteSubmit (cardId) {
    api.deleteCard(cardId).then(()=>{
      const newCards = cards.filter(cardItem=> cardItem._id !== cardId);
      setCards(newCards);
      setCardIdToDelete(null);
      closeAllPopups()}
    )
      .catch(err => console.log(err))
  }

  //функция для добавления карточек
  function handleAddPlaceSubmit (data) {
    setLoading(true);
    api.addCard(data)
      .then(card=>{
        setCards([card, ...cards])
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(()=>setLoading(false))
  }

  return (
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
        <Header />

        <Main
          onEditAvatar  = {handleEditAvatarClick}
          onEditProfile = {handleEditProfileClick}
          onAddPlace    = {handleAddPlaceClick}
          onCardClick   = {handleCardClick}
          cards         = {cards}
          onCardLike    = {handleCardLike}
          onCardDelete  = {handleCardDelete}
        />

        <Footer />

        <EditProfilePopup
            isOpen       = {isEditProfilePopupOpen}
            onClose      = {closeAllPopups}
            onUpdateUser = {handleUpdateUser}
            isLoading    = {loading}/>

          <EditAvatarPopup
            isOpen         = {isEditAvatarPopupOpen}
            onClose        = {closeAllPopups}
            onUpdateAvatar = {handleUpdateAvatar}
            isLoading      = {loading}/>

          <AddPlacePopup
            isOpen     = {isAddPlacePopupOpen}
            onClose    = {closeAllPopups}
            onAddPlace = {handleAddPlaceSubmit}
            isLoading  = {loading}
          />

          <ConfirmDeletePopup
            isOpen   = {isDeleteSubmitPopupOpen}
            cardId   = {cardIdToDelete}
            onSubmit = {handleCardDeleteSubmit}
            onClose  = {closeAllPopups}/>

        <ImagePopup
        card    = {selectedCard}
        onClose = {closeAllPopups}/>
        </CurrentUserContext.Provider>
      </div>
  );
}

export default App;
