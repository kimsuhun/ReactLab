import React, { useCallback, useState, useRef } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

const App = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: 'todo1',
      checked: true,
    },
    {
      id: 2,
      text: 'todo2',
      checked: true,
    },
    {
      id: 3,
      text: 'todo3',
      checked: false,
    },
  ]);

  const nextId = useRef(4);

  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      setTodos(todos.concat(todo));
      nextId.current += 1;
    },
    [todos],
  );

  const onRemove = useCallback(
    id => {
      setTodos(todos.filter(todo => todo.id !== id));
    },
    [todos],
  );

  const onToggle = useCallback(
    id => {
      setTodos(
        todos.map(todo =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo,
        ),
      );
    },
    [todos],
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;

/**
 * TodoTemplate : 화면을 가운데에 정렬시켜 주며, 앱 타이틀(일정관리)을 보여 줍니다.
 * chilren을 내부 JSX을 props로 받아 와서 렌더링해 줍니다.
 *
 * TodoInsert : 새로운 항목을 입력하고 추가할 수 있는 컴포넌트입니다. state를 통해 인풋의 상태를 관리합니다.
 *
 * TodoListItem: 각 할 일 항목에 대한 정보를 보여 주는 컴포넌트입니다. todo 객체를 props로
 * 받아 와서 상태에 따라 다른 스타일의 UI를 보여 줍니다.
 *
 * TodoList : todos 배열을 props로 받아 온 후, 이를 배열 내장 함수 map을 사용해서 여러 개의
 * TodoListItem 컴포넌트로 변환항여 보여 줍니다.
 */
