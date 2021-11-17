import './App.css';
import { useEffect, useState } from 'react';
import Card from './components/Card';
import { level1, level2, level3, level4 } from './data';

const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [level, setLevel] = useState('1');

  useEffect(() => {
    shuffleCards(getLevel());
  }, [level]);

  const getLevel = () => {
    return level === '2'
      ? level2
      : level === '3'
      ? level3
      : level === '4'
      ? level4
      : level1;
  };

  const shuffleCards = (level) => {
    const shuffledCards = shuffle([...level, ...level]).map((card) => ({
      ...card,
      id: Math.random(),
    }));
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    !choiceOne ? setChoiceOne(card) : setChoiceTwo(card);
  };

  useEffect(() => {
    if (!choiceOne || !choiceTwo) return;
    setIsDisabled(true);
    if (choiceOne.src === choiceTwo.src) {
      setCards((prevCards) => {
        return prevCards.map((card) => {
          if (card.src === choiceOne.src) {
            return { ...card, matched: true };
          }
          return card;
        });
      });
      resetTurn();
    } else {
      setTimeout(resetTurn, 1000);
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setIsDisabled(false);
  };

  return (
    <div className="App">
      <h1>League Memory</h1>
      <header>
        <button onClick={() => shuffleCards(getLevel())}>New Game</button>
        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="1">level 1</option>
          <option value="2">level 2</option>
          <option value="3">level 3</option>
          <option value="4">level 4</option>
        </select>
        <div>Moves: {turns}</div>
      </header>
      <div
        className="card-grid"
        style={{
          gridTemplateColumns: `repeat(${
            level === '3' ? '5' : level === '4' ? '6' : '4'
          }, minmax(30px, 130px))`,
        }}
      >
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            isDisabled={isDisabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
