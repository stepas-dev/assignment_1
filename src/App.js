import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import { GameNumber } from './components/GameNumber/GameNumber';
import { playGame } from './utils/game';
import { ArrayInput } from './components/ArrayInput/ArrayInput';

const App = () => {
  const [numbers, setNumbers] = useState([]);
  const [gameWon, setGameWon] = useState();
  useEffect(() => {
    try {
      setGameWon(playGame(numbers));
    } catch {
      setGameWon(undefined);
    }
  }, [numbers]);
  const handleSubmitArray = useCallback(newNumbers => {
    setNumbers(newNumbers);
  }, []);
  const handleNumberChange = useCallback((index, newNumber) => {
    setNumbers(oldNumbers => {
      const newNumbers = oldNumbers.slice();
      newNumbers[index] = newNumber;
      return newNumbers;
    });
  }, []);
  const handleNumberDelete = useCallback(index => {
    setNumbers(oldNumbers => {
      const newNumbers = oldNumbers.slice();
      newNumbers.splice(index, 1);
      return newNumbers;
    });
  }, []);
  const handleNumberInsert = useCallback((index, before) => {
    setNumbers(oldNumbers => {
      const newNumbers = oldNumbers.slice();
      if (before) {
        newNumbers.splice(index, 0, 0);
      } else {
        newNumbers.splice(index + 1, 0, 0);
      }
      return newNumbers;
    });
  }, []);
  let solutionUI;
  if (gameWon !== undefined) {
    solutionUI = <h2>{gameWon ? 'Game has a solution!' : 'Game has no solution :('}</h2>;
  }

  return (
    <div>
      <ArrayInput onSubmit={handleSubmitArray} />
      {numbers.length > 0 && (
        <div className={'game__container'}>
          <div className={'game__number-list'}>
            {numbers.map((n, i) => {
              return (
                <GameNumber
                  key={i}
                  index={i}
                  value={n}
                  onChange={handleNumberChange}
                  onDelete={handleNumberDelete}
                  onInsert={handleNumberInsert}
                />
              );
            })}
          </div>
          {solutionUI}
        </div>
      )}
    </div>
  );
};

export default App;
