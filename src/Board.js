import React, { useState, useEffect } from 'react';
import Card from './Card';
import './Board.css';

function Board() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);

  useEffect(() => {
    const createCards = () => {
      const cardPairs = ['A', 'B', 'C', 'D', 'E', 'F'];
      const allCards = [...cardPairs, ...cardPairs];
      const shuffledCards = allCards.sort(() => Math.random() - 0.5);
      setCards(shuffledCards.map((cardContent) => ({ cardContent, isFlipped: false })));
    };
    createCards();
  }, []);

  const handleCardClick = (index) => {
    if (!cards[index].isFlipped) {
      setCards((prevCards) => {
        const newCards = [...prevCards];
        newCards[index].isFlipped = true;
        return newCards;
      });
      setFlippedCards((prevFlippedCards) => [...prevFlippedCards, index]);

      if (flippedCards.length === 2) {
        // Check for a match after the second card is flipped
        const [firstCardIndex, secondCardIndex] = flippedCards;
        const firstCard = cards[firstCardIndex];
        const secondCard = cards[secondCardIndex];
        if (firstCard.cardContent !== secondCard.cardContent) {
          setTimeout(() => {
            setCards((prevCards) => {
              const newCards = [...prevCards];
              newCards[firstCardIndex].isFlipped = false;
              newCards[secondCardIndex].isFlipped = false;
              return newCards;
            });
            setFlippedCards([]);
          }, 1000);
        }
      }
    }
  };

  return (
    <div className="board">
      {cards.map((card, index) => (
        <Card key={index} {...card} handleClick={() => handleCardClick(index)} />
      ))}
    </div>
  );
}

export default Board;