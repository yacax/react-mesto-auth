
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = (
    `element__favorite ${isLiked && 'element__favorite_active'}`
  );

  function handleClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  function handleLike() {
    onCardLike(card);
  }

  return (
    <div className="element">

      <img
        src={card.link}
        alt={card.name}
        className="element__image"
        onClick={handleClick}
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