import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './styles.css';
import Root from './containers/Root';
import registerServiceWorker from './lib/workers/registerServiceWorker';
import configureStore from './redux/store';

const { store } = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
