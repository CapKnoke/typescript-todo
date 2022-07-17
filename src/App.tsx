import React, { useMemo } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Divider, Stack } from '@mui/material';
import { getDesignTokens }from './theme';
import { store } from './state/store';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './styles/App.scss';

function App() {
  store.subscribe(()=>{
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
  });
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(() => (
    createTheme(getDesignTokens(prefersDarkMode ? 'dark' : 'light'))
  ),[prefersDarkMode]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack
        className='main-content'
        divider={<Divider orientation="horizontal" flexItem />}
        gap={2}
      >
        <TodoForm />  
        <TodoList />
      </Stack>
    </ThemeProvider>
  );
}

export default App;
