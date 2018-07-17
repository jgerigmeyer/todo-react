// @flow

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import IconSettings from '@salesforce/design-system-react/components/icon-settings';
import utilitySprite from '@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

import List from './list/list';
import { listReducer } from './list/reducers';

const appStore = createStore(
  combineReducers({
    list: listReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const App = () => <List />;

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
