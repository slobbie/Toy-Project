import React, {
  useReducer,
  useContext,
  createContext,
  Dispatch,
  useRef,
} from 'react';

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

type state = {
  id: Number;
  text: string;
  done: boolean;
};

// type Action =
//   | { type: 'CREATE'; todo: state; id: number }
//   | { type: 'TOGGLE'; id: number }
//   | { type: 'REMOVE'; id: number };

const todoReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'CREATE':
      return state.concat(action.todo);
    case 'TOGGLE':
      return state.map((todo: state) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case 'REMOVE':
      return state.filter((todo: state) => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

type TodoDispatch = Dispatch<any>;

const TodoStateContext = React.createContext<any | null>(null);
const TodoDispatchContext = React.createContext<TodoDispatch | null>(null);
const TodoNextIdContext = React.createContext<any | null>(null);

const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId: any = useRef(5);
  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
};

export default TodoProvider;

export const useTodoState = () => {
  const state = useContext(TodoStateContext);
  if (!state) throw new Error('Cannot find TodoStateContext'); // 유효하지 않을땐 에러를 발생
  return state;
};

export const useTodoDispatch = () => {
  const dispatch = useContext(TodoDispatchContext);
  if (!dispatch) throw new Error('Cannot find TodoDispatchContext'); // 유효하지 않을땐 에러를 발생
  return dispatch;
};

export const useTodoNextId = () => {
  const nextId = useContext(TodoNextIdContext);
  if (!nextId) throw new Error('Cannot find TodoNextIdContext'); // 유효하지 않을땐 에러를 발생
  return nextId;
};
