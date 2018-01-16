import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ConnectedApp from './App';
import { store } from "./store";
import { Provider } from "react-redux";
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Provider store={store}><ConnectedApp/></Provider>, document.getElementById('root'));
registerServiceWorker();
