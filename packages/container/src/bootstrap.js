import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const renderReactDom = () => {
  ReactDOM.render(<App />, document.querySelector('#root'));
};

console.log(window.cordova, 'window.cordova');
if (window.cordova || true) {
  document.addEventListener('deviceready', () => {
    renderReactDom();
  }, false);
} else {
  renderReactDom();
}
