// @flow

import getPersistMiddleware from 'redux-persist-middleware';
import { getConfiguredCache } from 'money-clip';

export const cache = getConfiguredCache({
  version: '0.0.1',
});

const actionsToPersist = {
  TODO_ADDED: ['list'],
  TODO_REMOVED: ['list'],
  TODO_COMPLETED: ['list'],
  TODO_UNCOMPLETED: ['list'],
  SHOW_COMPLETED_TOGGLED: ['list'],
};

export const persistMiddleware = getPersistMiddleware({
  cacheFn: cache.set,
  logger: console.info, // eslint-disable-line no-console
  actionMap: actionsToPersist,
});
