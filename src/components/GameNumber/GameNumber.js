import React, { memo, useEffect, useRef, useState } from 'react';
import './GameNumber.css';

export const GameNumber = memo(props => {
  const [editMode, setEditMode] = useState(false);
  const inputRef = useRef(null);
  useEffect(() => {
    if (editMode && inputRef && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editMode]);
  let numberUI;
  if (editMode) {
    numberUI = (
      <input
        ref={inputRef}
        onBlur={() => setEditMode(false)}
        className={'game-number__input'}
        type="number"
        step={1}
        min={0}
        value={props.value}
        onChange={e => {
          props.onChange(props.index, +e.target.value);
        }}
      />
    );
  } else {
    numberUI = (
      <div
        className={'game-number__number'}
        onClick={() => {
          setEditMode(true);
        }}
      >
        {props.value}
      </div>
    );
  }

  return (
    <div className={'game-number__container'}>
      {numberUI}
      <button className={'game-number__delete'} onClick={() => props.onDelete(props.index)}>
        X
      </button>
      <button
        className={'game-number__insert game-number__insert-before'}
        onClick={() => props.onInsert(props.index, true)}
      >
        +
      </button>
      <button
        className={'game-number__insert game-number__insert-after'}
        onClick={() => props.onInsert(props.index, false)}
      >
        +
      </button>
    </div>
  );
});
