import React, { FormEvent, useRef } from 'react';
import { Button, Box, TextField, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Clock from './uiElements/Clock';
import { addTodo } from '../state/todoSlice';
import { useAppDispatch } from '../state/hooks';

export default function TodoForm() {
  const dispatch = useAppDispatch();
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null)
  
  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    if (titleRef.current && descriptionRef.current) {
      const formValues = {
        title: titleRef.current.value,
        description: descriptionRef.current.value
      };
      dispatch(addTodo(formValues));
      titleRef.current.value = '';
      descriptionRef.current.value = '';
    }
  };
  return (
    <Paper className="header-card" elevation={6}>
      <section className="title-container">
        <h1 className="title-container__title">Add ToDo</h1>
        <Clock className="title-container__clock" />
      </section>
      <Box component="form" className="registration-form" action="submit" onSubmit={handleAdd}>
        <TextField
          inputRef={titleRef}
          id="txtTodoItemToAdd"
          className="input-container__input"
          label="Title"
          required
        />
        <TextField
          inputRef={descriptionRef}
          className="input-container__input"
          label="Description"
        />
        <Button
          id="btnAddTodo"
          className="registration-form__button"
          type="submit"
          title="Add"
          variant="contained"
          size="large"
          endIcon={<AddIcon />}
        >
          Add
        </Button>
      </Box>
    </Paper>
  );
}
