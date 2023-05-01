import React, { useState } from "react"
import PopupWithForm from "./PopupWithForm"
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');

  React.useEffect(() => {
    if (currentUser.name) {
      setName(currentUser.name);
      setAbout(currentUser.about);
    }
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeAbout(e) {
    setAbout(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser(
      {
        name,
        about: about,
      });
  }

  return (

    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="popup__input popup__input_name_title"
        name="name"
        placeholder="Имя"
        required
        minLength="4"
        maxLength="40"
        id="profile-name-input"
        value={name}
        onChange={handleChangeName}
      />

      <span className="popup__error-text profile-name-input-error" />

      <input
        type="text"
        className="popup__input popup__input_name_subtitle"
        name="about"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
        id="profile-description-input"
        value={about}
        onChange={handleChangeAbout}
      />

      <span className="popup__error-text profile-description-input-error" />

    </PopupWithForm>
  )
}