import React, { useState } from 'react';
import './Card.css';

function Card({ isFlipped, handleClick, cardContent }) {
  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
      <div className="card-front">?</div>
      <div className="card-back">{cardContent}</div>
    </div>
  );
}

export default Card;