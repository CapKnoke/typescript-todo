import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './state/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { hydrate, Todo } from './state/todoSlice';
import './styles/index.scss';
import { EntityState } from '@reduxjs/toolkit';

const container = document.getElementById('root')!;
const root = createRoot(container);

const getTodosFromLocalStorage = (): EntityState<Todo> | void => {
  try { 
    const persistedState = localStorage.getItem('todos'); 
    if (persistedState) 
      return JSON.parse(persistedState).todos;
  }
  catch (e){ 
    console.log(e);
  }
};

const todos = getTodosFromLocalStorage()
if(todos){
  store.dispatch(hydrate(todos));
};

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
