// @flow

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import IconSettings from '@salesforce/design-system-react/components/icon-settings';
// $FlowFixMe
import logger from 'redux-logger';
import utilitySprite from '@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import List from './list/list';
import { cache, persistMiddleware } from './caching';
import { listReducer } from './list/reducers';

cache.getAll().then(data => {
  const appStore = createStore(
    combineReducers({
      list: listReducer,
    }),
    data,
    composeWithDevTools(applyMiddleware(persistMiddleware, logger)),
  );

  const el = document.getElementById('app');
  if (el) {
    ReactDOM.render(
      <IconSettings utilitySprite={utilitySprite}>
        <Provider store={appStore}>
          <App />
        </Provider>
      </IconSettings>,
      el,
    );
  }
});

const App = () => <List />;
