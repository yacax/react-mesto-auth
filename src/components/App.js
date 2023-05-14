import React, { useState, useEffect } from 'react';

import { api } from '../utils/Api'
import * as userAuth from '../utils/userAuth'

import Main from './Main';
import Footer from './Footer';

import { EditProfilePopup } from './EditProfilePopup';
import { EditAvatarPopup } from './EditAvatarPopup';
import { AddPlacePopup } from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';

import { CurrentUserContext, UserDataContext } from '../contexts/CurrentUserContext';

import { Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import Register from './Register';
import Login from './Login';

const App = () => {

  const navigate = useNavigate();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  const [infoTool, setInfoTool] = useState({ isOpen: false, text: '', result: '' });

  const [userData, setUserData] = useState({
    id: "",
    username: "",
    email: "",

  })

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    setToken(jwt);
  }, [])

  useEffect(() => {
    setIsLoading(true);
    if (!token) {
      setIsLoading(false);
      return
    }
    userAuth.getUserData(token)
      .then((user) => {
        setUserData(user);
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [token, navigate])

  const registerUser = ({ username, password, email }) => {
    userAuth.register(username, password, email)
      .then((res) => {
        setUserData({
          ...userData,
          id: res.data._id,
          username: res.data.email,
        });

        setInfoTool({
          ...infoTool,
          text: "Вы успешно зарегистрировались!",
          isOpen: true,
          result: true,
        }
        )
      }).then((res) => {
        userAuth
          .authorize(email, password)
          .then((res) => {
            localStorage.setItem("jwt", res.token);
            setToken(res.token)
          })
      })

      .catch((err) => {
        console.log(err)

        setInfoTool({
          ...infoTool,
          text: "Что-то пошло не так! Попробуйте ещё раз.",
          isOpen: true,
          result: false,
        }
        )
      })
  }

  const loginUser = ({ email, password }) => {
    userAuth
      .authorize(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setToken(res.token)
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setInfoTool({
          ...infoTool,
          text: "Неправильный логин или пароль!",
          isOpen: true,
          result: false,
        }
        )
      })
  }

  const logOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setToken("");
    setUserData({
      email: "",
      password: "",
      username: "",
    })
  }

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([
        api.getInitialCards(),
        api.getUserData()
      ]).then(([initialCards, userData]) => {
        setCards(initialCards)
        setCurrentUser(userData)
      })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLoggedIn])

  function handleCardDelete(card) {
    api
      .deleteCard(card._id).then(() => {
        setCards((state) => state.filter((o) => o._id !== card._id))

      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCardLike(card) {

    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api
      .toggleLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  const closeAllPopups = () => {
    switch (true) {
      case isEditProfilePopupOpen:
        setIsEditProfilePopupOpen(false);
        break;
      case isAddPlacePopupOpen:
        setIsAddPlacePopupOpen(false);
        break;
      case isEditAvatarPopupOpen:
        setIsEditAvatarPopupOpen(false);
        break;
      case isImagePopupOpen:
        setIsImagePopupOpen(false);
        break;
      case infoTool.isOpen:
        setInfoTool({
          ...infoTool,
          isOpen: false,
        })
        break;
      default:
        break;
    }
  }

  function handleUpdateUser(user) {

    console.log(user.name)
    api
      .patchUserData(user.name, user.about)
      .then((newUser) => {
        setCurrentUser(newUser)
        closeAllPopups()
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleUpdateAvatar(newAvatar) {

    api
      .patchAvatar(newAvatar.avatar)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleAddPlaceSubmit(newPlace) {

    api
      .postNewCard(newPlace)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (isLoading) {
    return <div className='body'>Загрузка...</div>;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <UserDataContext.Provider value={userData}>
        <div className="body">
          <div className="page">

            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute
                    path="/"
                    loggedIn={isLoggedIn}
                    component={Main}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    cards={cards}
                    setCards={setCards}
                    onCardDelete={handleCardDelete}
                    logOut={logOut}
                  />
                }
              />

              <Route
                path="/sign-up"
                element={
                  <Register registerUser={registerUser} />
                }
              />

              <Route
                path="/sign-in"
                element={
                  <Login loginUser={loginUser} />
                }
              />

            </Routes>
            {isLoggedIn && <Footer />}

          </div>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser} />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit} />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar} />

          <ImagePopup
            name="card"
            selectedCard={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups} />

          <InfoTooltip
            result={infoTool.result}
            text={infoTool.text}
            isOpen={infoTool.isOpen}
            onClose={closeAllPopups} />

        </div>
      </UserDataContext.Provider>
    </CurrentUserContext.Provider >
  );
};

export default App;
