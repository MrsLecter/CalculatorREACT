import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import './App.css';

import { Display } from './components/Display';
import { Keyboard } from './components/Keyboard';

import { toCalculate } from './utils/utils';

let areBracketsOpen: boolean = false;

function App() {
  type elementButton = {
    id: string,
    class: string,
    value: string
  };

  const numbersButton: elementButton[] = [
    { id: 'clear', class: 'yellow', value: 'C' },
    { id: 'clearBack', class: 'yellow', value: 'CE' },
    { id: '%', class: 'yellow', value: '%' },
    { id: 'divide', class: 'yellow', value: '/' },
    { id: '7', class: 'number', value: '7' },
    { id: '8', class: 'number', value: '8' },
    { id: '9', class: 'number', value: '9' },
    { id: 'multiply', class: 'red', value: '*' },
    { id: '4', class: 'number', value: '4' },
    { id: '5', class: 'number', value: '5' },
    { id: '6', class: 'number', value: '6' },
    { id: 'minus', class: 'red', value: '-' },
    { id: '1', class: 'number', value: '1' },
    { id: '2', class: 'number', value: '2' },
    { id: '3', class: 'number', value: '3' },
    { id: 'add', class: 'red', value: '+' },
    { id: 'brackets', class: 'number', value: '( )' },
    { id: 'dot', class: 'number', value: '.' },
    { id: '0', class: 'number', value: '0' },
    { id: 'calc', class: 'red', value: '=' }
  ]
  const [input, setInput] = useState<string>('');
  // let inputArray: string[] = [];

  function handleButtonClick(e: ChangeEvent<HTMLElement>): void {
    let inputValue: string = e.target.innerText;
    if (inputValue === 'C') {
      setInput('');
    } else if (inputValue === '=') {
      setInput(toCalculate(input))
    } else if (inputValue === 'CE') {
      let inputStr = input;
      let newInput = inputStr.substring(0, inputStr.length - 1);
      setInput(newInput);
    } else if (inputValue === '( )') {
      if (areBracketsOpen) {
        setInput(input + ')');
      } else if (areBracketsOpen === false) {
        setInput(input + '(');
      }
      areBracketsOpen = !areBracketsOpen;
    } else {
      setInput(input + inputValue);
    }
  }

  function handleKeyboardPress(e: KeyboardEvent<HTMLElement>): void {
    let inputValue = e.key;
    let allowInput: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '%', '0', '*', '-', '+', '.', '(', ')', '/'];

    if (allowInput.includes(inputValue)) {
      if (inputValue === '=') {
        console.log(input);
        setInput('');
      } else {
        setInput(input + inputValue);
      }
    } else {
      console.warn('IncorrectInput: ' + inputValue);
    }
    switch (e.key) {
      case '1':
        setInput(input + '1');
        break;

    }

  }
  return (
    <div className="App" onKeyPress={handleKeyboardPress}>
      <div className='wrapper'>
        <Display inputDisplay={input} />
        <Keyboard buttons={numbersButton} handleButtonClick={handleButtonClick} />
      </div>
      
    </div>
  );
}

export default App;
