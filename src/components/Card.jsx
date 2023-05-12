
import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = (
    `element__favorite ${isLiked && 'element__favorite_active'}`
  );

  useEffect(() => {
    const img = new Image();
    img.src = card.link;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);
  }, [card.link]);

  function handleClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  function handleLike() {
    onCardLike(card);
  }

  function handleImageLoad() {
    setImageLoaded(true);
  }

  function handleImageError() {
    setImageError(true);
  }


  if (!imageLoaded || imageError) {
    return null;
  }

  return (
    <div className="element">

      <img
        src={card.link}
        alt={card.name}
        className="element__image"
        onClick={handleClick}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />

      <h2 className="element__title">{card.name}</h2>

      <button
        className={cardLikeButtonClassName}
        type="button"
        onClick={handleLike}
      />

      <p className="element__likes">{card.likes.length}</p>

      {
        isOwn &&
        <button
          className="element__delete-button"
          type="button"
          onClick={handleDeleteClick}
        />
      }

    </div>
  )
}