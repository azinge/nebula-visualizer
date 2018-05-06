import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './styles.css';
import App from './containers/App';
import registerServiceWorker from './lib/workers/registerServiceWorker';
import configureStore from './redux/store';

const { store } = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
