import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const tasks = [{title: "Faire les courses", id: 1}, {title: "Tondre la pelouse", id: 2}];

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App tasks={tasks}/>, div);
});
