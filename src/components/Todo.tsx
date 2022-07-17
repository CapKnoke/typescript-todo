import React, { KeyboardEvent, MouseEvent, useRef, useState } from 'react';
import { Paper, IconButton, Divider } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { completeTodo, deleteTodo, selectTodoById } from '../state/todoSlice';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { EntityId } from '@reduxjs/toolkit';

export type TodoProps = {
  id: EntityId,
}

export default function Todo({ id }: TodoProps) {
  const [elevation, setElevation] = useState(6);
  const todo = useAppSelector(selectTodoById(`${id}`));
  const todoRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const complete = () => {
    todoRef.current && dispatch(completeTodo(todoRef.current.id));
  };
  const remove = (e: KeyboardEvent | MouseEvent) => {
    e.stopPropagation();
    todoRef.current && dispatch(deleteTodo(todoRef.current.id));
  };
  return (
    <Paper
      ref={todoRef}
      id={todo?.id}
      className={`todo todo--toggle-completed${todo?.complete ? ' todo--completed' : ''}`}
      elevation={elevation}
      role="button"
      onClick={() => complete()}
      onKeyDown={e => {
        if (e.code === 'Space' || e.code === 'Enter') {
          complete();
        }
      }}
      onMouseOver={() => setElevation(12)}
      onMouseOut={() => setElevation(6)}
      tabIndex={0}
    >
      <section className="todo-header">
        <h1 className="todo-header__title">{todo?.title}</h1>
        <section className='todo-button-container'>
          { todo?.complete && (
            <IconButton
              id="removeButton"
              className="todo-header__button todo__button--remove"
              onClick={remove}
              onKeyDown={(e: KeyboardEvent) => {
                if (e.code === 'Space' || e.code === 'Enter') {
                  remove(e);
                }
              }}
              color="error"
              component="button"
            >
              <ClearIcon />
            </IconButton>
          )}
        </section>
      </section>
      { todo?.description && (
        <>
          <Divider className='todo__divider' orientation="horizontal" flexItem />
          <section className="todo-body">
            <p>{todo.description}</p>
          </section>
        </>
      )}
    </Paper>
  );
}
