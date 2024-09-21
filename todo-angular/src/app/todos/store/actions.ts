import { createAction, props } from '@ngrx/store';
import { Todo, TodoFilter } from '../models';

export const addAction = createAction('[TODO] add', (text: string) => ({
  id: Math.random(),
  text,
}));

export const loadAction = createAction('[TODO] load');

export const loadSuccessAction = createAction(
  '[TODO] load success',
  props<{ todos: Todo[] }>(),
);

export const deleteAction = createAction(
  '[TODO] delete',
  props<{ id: number }>(),
);

export const toggleAction = createAction(
  '[TODO] toggle',
  props<{ id: number }>(),
);

export const updateAction = createAction(
  '[TODO] update',
  props<{ id: number; text: string }>(),
);

export const createTodoAction = createAction(
  '[TODO] Create Todo',
  props<{ todo: Todo }>(),
);

export const createTodoSuccessAction = createAction(
  '[TODO] Create Todo Success',
  props<{ todo: Todo }>(),
);

export const createTodoFailureAction = createAction(
  '[TODO] Create Todo Failure',
  props<{ error: any }>(),
);
export const clearCompletedAction = createAction('[TODO] clear completed');

export const setFilterAction = createAction(
  '[TODO] Set filter',
  props<{ filter: TodoFilter }>(),
);
