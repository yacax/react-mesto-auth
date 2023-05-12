import React from 'react';

import { Card } from './Card';
import { CurrentUserContext, UserDataContext } from '../contexts/CurrentUserContext';
import Header from './Header';

const Main = ({ onEditProfile, onAddPlace, onEditAvatar, ...props }) => {

  const currentUser = React.useContext(CurrentUserContext);
  const userData = React.useContext(UserDataContext);
  const cardsElements = props.cards.map(card => {

    return (
      <Card
        key={card._id}
        card={card}
        onCardClick={props.onCardClick}
        onCardLike={props.onCardLike}
        onCardDelete={props.onCardDelete}
      />
    )
  })

  return (
    <>
      <Header
        linkTo="/sign-in"
        linkName="Выйти"
        email={userData.data.email}
        logOut={props.logOut}
      />
      <main>
        <section className="profile">
          <div
            className="profile__avatar-container"
            onClick={onEditAvatar}>
            <div className="profile__avatar-edit" />
            <img
              src={currentUser.avatar}
              alt="Фотография пользователя."
              className="profile__avatar" />
          </div>

          <div className="profile__info">
            <h1 className="profile__title"> {currentUser.name} </h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={onEditProfile} />
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
          <button
            className="profile__add-button"
            type="button"
            onClick={onAddPlace} />
        </section>

        <section
          className="elements"
          aria-label="Галлерея мест пользователя">
          {cardsElements}
        </section>

      </main>
    </>
  );
};

export default Main;