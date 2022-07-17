import { createEntityAdapter, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from '@reduxjs/toolkit';
import { RootState } from './store';

export type Todo = {
  id: string,
  title: string,
  description: string | null,
  complete: boolean,
}

const todosAdapter = createEntityAdapter<Todo>();
const sliceSelectors = todosAdapter.getSelectors<EntityState<Todo>>(state => state);

const todoSlice = createSlice({
  name: 'todos',
  initialState: todosAdapter.getInitialState(),
  reducers: {
    hydrate: (state: EntityState<Todo>, action: PayloadAction<EntityState<Todo>>) => action.payload,
    addTodo: {
      reducer: todosAdapter.addOne,
      prepare: (formValues: { title: string, description: string }) => {
        return {
          payload: {
            id: nanoid(),
            title: formValues.title,
            description: formValues.description || null,
            complete: false,
          },
        };
      },
    },
    completeTodo(state: EntityState<Todo>, action: PayloadAction<string>) {
      const todo = sliceSelectors.selectById(state, action.payload);
      todosAdapter.updateOne(state, {
        id: action.payload,
        changes: {
          complete: !todo?.complete,
        }
      });
    },
    deleteTodo: todosAdapter.removeOne,
  },
});

export const {
  hydrate,
  addTodo,
  completeTodo,
  deleteTodo,
} = todoSlice.actions;

export const todoSelectors = todosAdapter.getSelectors((state: RootState) => state.todos);
export const selectTodoById = (id: string) => (state: RootState) => todoSelectors.selectById(state, id);

export default todoSlice.reducer;