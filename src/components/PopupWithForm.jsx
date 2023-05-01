import React, { useEffect } from 'react';

const PopupWithForm = (
  { name,
    title,
    children,
    isOpen,
    onClose,
    buttonText = 'Сохранить',
    onSubmit
  }) => {

  const handleOverlayClose = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscClose = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscClose);
    }
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };

  }, [isOpen, onClose]);

  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
      onClick={handleOverlayClose}
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose} />
        <form className={`popup__form popup__form_name_${name}`} onSubmit={onSubmit}>
          <h2 className="popup__title">{title}</h2>
          {children}
          <input
            type="submit"
            className="popup__save-button"
            name="popup-save-button"
            value={buttonText}
          />
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;