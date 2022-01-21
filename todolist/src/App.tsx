import React from 'react';
import TodoProvider from './components/TodoContext';
import TodoCreate from './components/TodoCreate';
import TodoHeader from './components/TodoHeader';
import TodoList from './components/TodoList';
import TodoTemplate from './components/TodoTemplate';
import './styles/init.scss';

function App() {
  return (
    <div className='App'>
      <TodoProvider>
        <TodoTemplate>
          <TodoHeader />
          <TodoList />
          <TodoCreate />
        </TodoTemplate>
      </TodoProvider>
    </div>
  );
}

export default App;
