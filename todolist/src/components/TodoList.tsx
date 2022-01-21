import TodoItem from './TodoItem';
import { useTodoState } from './TodoContext';
type state = {
  id: number;
  text: string;
  done: boolean;
};

const TodoList = () => {
  const todos = useTodoState();

  return (
    <div className='TodoListblock'>
      {todos.map((todo: state) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          done={todo.done}
        />
      ))}
    </div>
  );
};

export default TodoList;
