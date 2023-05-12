import React, { useEffect } from 'react';
import successImage from '../images/success.svg';
import failImage from '../images/fail.svg';

const InfoTooltip = (
  { registrationResult,
    registrationMessage,
    isOpen,
    onClose,
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
      className={`popup popup_type_register ${isOpen ? 'popup_opened' : ''}`}
      onClick={handleOverlayClose}
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose} />
        <div
          className="popup__content">
          <img
            className='popup__picture'
            src={registrationResult ? successImage : failImage} alt={registrationMessage} />
          <p className='popup__info'>{registrationMessage}</p>

        </div>
      </div>
    </div>
  );
};

export default InfoTooltip;