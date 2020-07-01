import React from 'react';
import { playGame } from './utils/game';
import { shallow, configure } from 'enzyme';
import { ArrayInput } from './components/ArrayInput/ArrayInput';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('Result of [1, 2, 0, 3, 0, 2, 0] array should be true', () => {
  const result = playGame([1, 2, 0, 3, 0, 2, 0]);
  expect(result).toBeTruthy();
});

test('Result of [1, 2, 0, 1, 0, 2, 0] array should be false', () => {
  const result = playGame([1, 2, 0, 1, 0, 2, 0]);
  expect(result).toBeFalsy();
});

test('Result of [5, 5, 0, 1, 1, 0, 2, 0, 1, 1] array should be true', () => {
  const result = playGame([5, 5, 0, 1, 1, 0, 2, 0, 1, 1]);
  expect(result).toBeTruthy();
});

test('Result of [5, 4, 0, 1, 1, 0, 2, 0, 1, 1] array should be false', () => {
  const result = playGame([5, 4, 0, 1, 1, 0, 2, 0, 1, 1]);
  expect(result).toBeFalsy();
});

test('[] array should throw "Array can not be empty"', () => {
  expect(() => playGame([])).toThrow('Array can not be empty');
});

test('[-1, 2, 2] array should throw "Number can not be negative"', () => {
  expect(() => playGame([-1, 2, 2])).toThrow('Number can not be negative');
});

test('ArrayInput should have error on empty submit', () => {
  const wrapper = shallow(<ArrayInput onSubmit={() => {}} />);
  wrapper.find('button.array-input__submit').simulate('click');
  setTimeout(() => {
    expect(wrapper.contains(<p>Invalid input !</p>)).toBeTruthy();
  }, 0);
});

test('ArrayInput should have error on "1 a 2" submit', () => {
  const wrapper = shallow(<ArrayInput onSubmit={() => {}} />);
  wrapper.find('input').simulate('change', { target: { value: '1 a 2' } });
  wrapper.find('button.array-input__submit').simulate('click');
  setTimeout(() => {
    expect(wrapper.contains(<p>Invalid input !</p>)).toBeTruthy();
  }, 0);
});

test('ArrayInput should not have error on "1 2 3" submit', () => {
  const wrapper = shallow(<ArrayInput onSubmit={() => {}} />);
  wrapper.find('input').simulate('change', { target: { value: '1 2 3' } });
  wrapper.find('button.array-input__submit').simulate('click');
  setTimeout(() => {
    expect(wrapper.contains(<p>Invalid input !</p>)).toBeFalsy();
  }, 0);
});

test('ArrayInput should not have error on " 2  2  3  " submit', () => {
  const wrapper = shallow(<ArrayInput onSubmit={() => {}} />);
  wrapper.find('input').simulate('change', { target: { value: ' 2  2  3  ' } });
  wrapper.find('button.array-input__submit').simulate('click');
  setTimeout(() => {
    expect(wrapper.contains(<p>Invalid input !</p>)).toBeFalsy();
  }, 0);
});
