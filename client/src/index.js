import './style.css';
import './config/moment';
import React from 'react';
import ReactDOM from 'react-dom';
import './icon';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import store from './store';
import AppContainer from './components/App/Container';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </CookiesProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
