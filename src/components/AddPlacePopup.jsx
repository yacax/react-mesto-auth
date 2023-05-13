import PopupWithForm from "./PopupWithForm"
import React, { useEffect } from "react";
import useForm from "../hooks/useForm";

export function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const { form, errors, isFormValid, handleChange, resetForm, hardChangeIsFormValid } = useForm({
    name: "",
    link: "",
  })

  useEffect(() => {
    resetForm();
    hardChangeIsFormValid(false);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(form);
  }

  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Создать"
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <input
        type="text"
        className="form__input popup__input_name_title"
        name="name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        id="place-name-input"
        value={form.name}
        onChange={handleChange}
      />
      <span className="form__error-text place-name-input-error">{errors.name} </span>

      <input
        type="url"
        className="form__input popup__input_name_subtitle"
        name="link"
        placeholder="Ссылка на картинку"
        id="place-url-input"
        required
        value={form.link}
        onChange={handleChange}
      />
      <span className="form__error-text place-url-input-error" >{errors.link} </span>
    </PopupWithForm>
  )

}