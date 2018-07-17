// @flow

export type AddToDoAction = { type: 'TODO_ADDED', payload: string };
export type CompleteToDoAction = {
  type: 'TODO_COMPLETED',
  payload: string,
};
export type UncompleteToDoAction = {
  type: 'TODO_UNCOMPLETED',
  payload: string,
};

export type Action = AddToDoAction | CompleteToDoAction | UncompleteToDoAction;

export const addToDoItem = (payload: string): AddToDoAction => ({
  type: 'TODO_ADDED',
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
