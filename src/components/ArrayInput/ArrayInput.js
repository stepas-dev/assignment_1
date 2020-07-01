import React, { memo, useEffect, useState } from 'react';
import './ArrayInput.css';

export const ArrayInput = memo(props => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  useEffect(() => {
    let timeout;
    if (error) {
      timeout = setTimeout(() => {
        setError(false);
      }, 5000);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [error]);
  const handleValidateInputAndSubmit = () => {
    const formattedValue = value.trim();
    const regexp = new RegExp('^(\\d+($|\\s+))+$');
    const valid = regexp.test(formattedValue);

    if (valid) {
      const numbers = formattedValue
        .split(' ')
        .filter(n => n !== '')
        .map(n => parseInt(n, 10));
      props.onSubmit(numbers);
    } else {
      setError(true);
    }
  };
  const handleClearInput = () => {
    setValue('');
    props.onSubmit([]);
  };

  return (
    <div className={'array-input__container'}>
      <p>Enter numbers separated by spaces</p>
      <div className={'array-input__input-container'}>
        <input type="text" value={value} onChange={e => setValue(e.target.value)} />
        {error && <p>Invalid input !</p>}
      </div>
      <div className={'array-input__controls'}>
        <button className={'btn array-input__submit'} onClick={handleValidateInputAndSubmit}>
          Submit new array
        </button>
        <button className={'btn'} onClick={handleClearInput}>
          Clear
        </button>
      </div>
    </div>
  );
});
