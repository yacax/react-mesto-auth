import React from "react"
import PopupWithForm from "./PopupWithForm"
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import useForm from "../hooks/useForm";

export function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const { form, errors, isFormValid, handleChange } = useForm({
    name: "",
    about: "",
  });

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {

    if (currentUser.name || currentUser.about) {
      form.name = currentUser.name;
      form.about = currentUser.about;
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(form);
  }

  return (

    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <input
        type="text"
        className="form__input popup__input_name_title"
        name="name"
        placeholder="Имя"
        required
        minLength="4"
        maxLength="40"
        id="profile-name-input"
        value={form.name}

        onChange={handleChange}
      />
      <span className="form__error-text profile-name-input-error" >{errors.name} </span>

      <input
        type="text"
        className="form__input popup__input_name_subtitle"
        name="about"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
        id="profile-description-input"
        value={form.about}
        onChange={handleChange}
      />
      <span className="form__error-text profile-description-input-error" >{errors.about}</span>

    </PopupWithForm>
  )
}