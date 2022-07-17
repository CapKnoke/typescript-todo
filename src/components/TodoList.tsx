import React from 'react';
import { Stack } from '@mui/material';
import Todo from './Todo';
import { useAppSelector } from '../state/hooks';
import { todoSelectors } from '../state/todoSlice';

export default function TodoList() {
  const todoIds = useAppSelector(todoSelectors.selectIds);
  return (
    <Stack
      id="todoList"
      className="todo-list"
    >
      { todoIds.length ? todoIds.map(id => <Todo key={id} id={id} />) : null }
    </Stack>
  );
}
