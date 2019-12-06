import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import Test from './components/C09_01';

import Test from './App.js';


import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Test name='小王' title='总经理'  />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

