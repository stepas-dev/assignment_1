// recursion method
export const playGame = array => {
  if (array.length === 0) {
    throw new Error('Array can not be empty');
  }

  const finishIndex = array.length - 1;
  const currentIndex = 0;
  const stepsLeft = finishIndex - currentIndex;
  const currentNumber = array[currentIndex];

  if (currentNumber < 0) {
    throw new Error('Number can not be negative');
  }

  let result = checkIfWon(currentNumber, stepsLeft);
  if (result) {
    return true;
  }

  for (let minus = 0; minus < currentNumber; minus++) {
    const step = currentNumber - minus;
    result = playGame(array.slice(step));
    if (result) {
      return true;
    }
  }

  return false;
};

// iteration method
export const playGame2 = array => {
  if (array.length === 0) {
    throw new Error('Array can not be empty');
  }

  const finishIndex = array.length - 1;
  let result;
  let prevIndexes = [];
  let prevMinuses = [];
  let currentIndex = 0;
  let minus = 0;
  let stepsLeft = finishIndex - currentIndex;
  let currentNumber = array[currentIndex] - minus;

  while (true) {
    if (currentNumber < 0) {
      throw new Error('Number can not be negative');
    }

    result = checkIfWon(currentNumber, stepsLeft);
    if (result) {
      return true;
    } else if (currentNumber > 0) {
      prevMinuses.push(minus);
      prevIndexes.push(currentIndex);

      currentIndex += currentNumber;
      minus = 0;
      stepsLeft = finishIndex - currentIndex;
      currentNumber = array[currentIndex] - minus;
    } else {
      minus = prevMinuses.pop();
      currentIndex = prevIndexes.pop();

      if (minus === undefined || currentIndex === undefined) {
        break;
      }

      minus += 1;
      stepsLeft = finishIndex - currentIndex;
      currentNumber = array[currentIndex] - minus;
    }
  }

  return false;
};

const checkIfWon = (number, left) => {
  if (number >= left) {
    return true;
  }

  return false;
};
