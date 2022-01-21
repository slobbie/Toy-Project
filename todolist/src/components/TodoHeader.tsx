import { useTodoState } from './TodoContext';
const TodoHeader = () => {
  const todos = useTodoState();
  const undoneTasks = todos.filter((todo: any) => !todo.done); // filter 를 돌려 todo.done => false인 todo 표시

  const today = new Date(); // 생성자함수
  const deteString = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }); // 현재 년도 달 일 지정
  const dayname = today.toLocaleDateString('ko-KR', { weekday: 'long' }); // 요일 표시
  return (
    <div className='TodoHeadBlock'>
      <h1>{deteString}</h1>
      <div className='day'>{dayname}</div>
      <div className='tasks-left'>할 일 {undoneTasks.length}개 남음</div>
    </div>
  );
};

export default TodoHeader;
