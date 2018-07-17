// @flow

import uuid from 'uuid/v4';

import type { Action } from './actions';

export type ListItem = {
  +id: string,
  +text: string,
  +done: boolean,
};
export type ListState = {
  +items: Array<ListItem>,
};

export const listReducer = (
  state: ListState = {
    items: [
      { id: uuid(), text: 'do this', done: true },
      { id: uuid(), text: 'do that', done: false },
    ],
  },
  action: Action,
): ListState => {
  switch (action.type) {
    case 'TODO_ADDED':
      return {
        ...state,
        items: [
          ...state.items,
          { id: uuid(), text: action.payload, done: false },
        ],
      };
    case 'TODO_COMPLETED':
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === action.payload) {
            return { ...item, done: true };
          }
          return item;
        }),
      };
    case 'TODO_UNCOMPLETED':
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === action.payload) {
            return { ...item, done: false };
          }
          return item;
        }),
      };
  }
  return state;
};
