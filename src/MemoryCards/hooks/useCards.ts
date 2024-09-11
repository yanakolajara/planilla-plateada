/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import data from '../data/CardOptions.json';

interface Card {
  id: string;
  value: string;
  flipped: boolean;
  image: string;
}

const useCards = () => {
  const [cards, setCards] = React.useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = React.useState<Card[]>([]);
  const [matchedCards, setMatchedCards] = React.useState<Card[]>([]);
  const [score, setScore] = React.useState(0);
  const [wrongMatches, setWrongMatches] = React.useState<number>(0);
  const [timeElapsed, setTimeElapsed] = React.useState({
    startTime: 0,
    endTime: 0,
    resultTime: 0,
  });

  const generateCards = (pairs: number) => {
    const newCards: Card[] = [];
    for (let i = 0; i < pairs; i++) {
      newCards.push(
        {
          id: Math.random().toString(36).substring(2, 15),
          value: data[i].value,
          flipped: true,
          image: data[i].image,
        },
        {
          id: Math.random().toString(36).substring(2, 15),
          value: data[i].value,
          flipped: true,
          image: data[i].image,
        }
      );
      setCards(newCards.sort(() => Math.random() - 0.5));
    }
    setTimeout(() => {
      setCards(
        newCards.map((c) => {
          return { ...c, flipped: false };
        })
      );
      const startTime = Date.now();
      setTimeElapsed({ ...timeElapsed, startTime: startTime });
    }, 1500);
  };

  const handleFlip = (card: Card) => {
    if (selectedCards.length < 2 && card.flipped === false) {
      setCards(
        cards.map((c) => (c.id === card.id ? { ...c, flipped: true } : c))
      );
      setSelectedCards([...selectedCards, card]);
    }
  };

  const handleMatch = () => {
    const [card1, card2] = selectedCards;
    if (card1.value === card2.value) {
      setMatchedCards([...matchedCards, card1, card2]);
      setSelectedCards([]);
      setScore(score + 50);
    } else {
      setTimeout(() => {
        setCards(
          cards.map((c) =>
            c.id === card1.id || c.id === card2.id
              ? { ...c, flipped: false }
              : c
          )
        );
        setSelectedCards([]);
        setScore(score - 10);
        setWrongMatches(wrongMatches + 1);
      }, 1000);
    }
  };

  const getTimeResult = (): number => timeElapsed.resultTime;

  const addTimeScore = (timerResult: number) => {
    if (timerResult <= 30) {
      setScore(score + 500);
    } else if (timerResult <= 60) {
      setScore(score + 400);
    } else if (timerResult <= 120) {
      setScore(score + 300);
    } else if (timerResult <= 180) {
      setScore(score + 200);
    } else if (timerResult <= 240) {
      setScore(score + 100);
    }
  };

  React.useEffect(() => {
    if (selectedCards.length === 2) handleMatch();
    if (matchedCards.length === cards.length && !!cards.length) {
      setScore(score + 200);
      const endTime = Date.now();
      setTimeElapsed({ ...timeElapsed, endTime: endTime });
    }
  }, [selectedCards]);

  React.useEffect(() => {
    if (timeElapsed.endTime && !timeElapsed.resultTime) {
      let resultTime = (timeElapsed.endTime - timeElapsed.startTime) / 1000;
      addTimeScore(resultTime);
      setTimeElapsed({
        ...timeElapsed,
        resultTime: resultTime,
      });
    }
  }, [timeElapsed]);

  React.useEffect(() => {
    generateCards(4);
  }, []);

  return {
    cards,
    selectedCards,
    matchedCards,
    wrongMatches,
    score,
    handleFlip,
    handleMatch,
    getTimeResult,
  };
};

export { useCards };
