import React from 'react';
import TodoCreate from './components/TodoCreate';
import TodoHeader from './components/TodoHeader';
import TodoList from './components/TodoList';
import TodoTemplate from './components/TodoTemplate';
import './styles/init.scss';

function App() {
  return (
    <div className='App'>
      <TodoTemplate>
        <TodoHeader />
        <TodoList />
        <TodoCreate />
      </TodoTemplate>
    </div>
  );
}

export default App;
