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
  +showCompleted: boolean,
};

export const listReducer = (
  state: ListState = {
    items: [],
    showCompleted: false,
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
    case 'TODO_REMOVED':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
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
    case 'SHOW_COMPLETED_TOGGLED':
      return {
        ...state,
        showCompleted: action.payload,
      };
  }
  return state;
};
