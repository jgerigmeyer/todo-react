// @flow

type AddToDoAction = { type: 'TODO_ADDED', payload: string };
type RemoveToDoAction = { type: 'TODO_REMOVED', payload: string };
type CompleteToDoAction = {
  type: 'TODO_COMPLETED',
  payload: string,
};
type UncompleteToDoAction = {
  type: 'TODO_UNCOMPLETED',
  payload: string,
};

export type Action =
  | AddToDoAction
  | RemoveToDoAction
  | CompleteToDoAction
  | UncompleteToDoAction;

export const addToDoItem = (payload: string): AddToDoAction => ({
  type: 'TODO_ADDED',
  payload,
});
export const removeToDoItem = (payload: string): RemoveToDoAction => ({
  type: 'TODO_REMOVED',
  payload,
});
export const completeToDoItem = (payload: string): CompleteToDoAction => ({
  type: 'TODO_COMPLETED',
  payload,
});
export const uncompleteToDoItem = (payload: string): UncompleteToDoAction => ({
  type: 'TODO_UNCOMPLETED',
  payload,
});
