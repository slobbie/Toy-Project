import React, { useReducer, createContext, useContext } from 'react';

const initialTodos = [
  {
    id: 1,
    text: '프로젝트 생성하기',
    done: true,
  },
  {
    id: 2,
    text: '컴포넌트 스타일링하기',
    done: true,
  },
  {
    id: 3,
    text: 'Context 만들기',
    done: false,
  },
  {
    id: 4,
    text: '기능 구현하기',
    done: false,
  },
];

interface TodoDateModel {
  id: Number;
  text: string;
  done: boolean;
}

interface TodoActionDateModel<T> {}

const todoReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'CREATE':
      return state.concat(action.todo);
    case 'TOGGLE':
      return state.map((todo: TodoDateModel) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case 'REMOVE':
      return state.filter((todo: TodoDateModel) => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
const TodoStateContext = React.createContext({} as TodoDateModel);
const TodoDispatchContext = createContext<T>(null);

const TodoProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
};

export default TodoProvider;

export const useTodoState = () => {
  return useContext(TodoStateContext);
};

export const useRodoDispatch = () => {
  return useContext(TodoDispatchContext);
};
