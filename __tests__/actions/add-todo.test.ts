/* eslint-disable no-undef */
import { ADD_TODO, addTodo } from './add-todo';

describe('actions', () => {
  it('should create an action to add a todo', () => {
    const text = 'Finish docs';
    const expectedAction = {
      type: ADD_TODO,
      text,
    };
    expect(addTodo(text)).toEqual(expectedAction);
  });
});
