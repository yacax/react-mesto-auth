import { useEffect, useRef } from "react";

import PopupWithForm from "./PopupWithForm"

export function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const newAvatar = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: newAvatar.current.value,
    });
  }

  useEffect(() => {
    newAvatar.current.value = '';
  }, [isOpen])

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        className="popup__input popup__input_name_subtitle"
        name="avatar"
        placeholder="Ссылка на картинку"
        id="place-url-avatar-input"
        required
        ref={newAvatar}
      />
      <span className="popup__error-text place-url-avatar-input-error" />
    </PopupWithForm>
  )
}