import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const tasks = [{title: "Faire les courses", id: 1}, {title: "Tondre la pelouse", id: 2}];

ReactDOM.render(<App tasks={tasks}/>, document.getElementById('root'));
registerServiceWorker();
