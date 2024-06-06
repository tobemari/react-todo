import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AddTodoForm from './AddTodoForm'
import TodoList from './TodoList'

function useSemiPersistentState() {
  const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem('savedTodoList')) || []);
  useEffect(() => {
    localStorage.setItem('savedTodoList', JSON.stringify(todoList));
  }, [todoList]);

  return [todoList, setTodoList];
};

function App() {
  const [todoList, setTodoList] = useSemiPersistentState();

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };
 
  const removeTodo = (id) => {
  const updatedTodoList = todoList.filter(todo => todo.id !==id);
  setTodoList(updatedTodoList);
  };

  return (
    <>
    <div>
      <h1>Todo List</h1>
    </div>
    <div>
      <AddTodoForm onAddTodo={addTodo} />
    </div>
    <div>
      <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
    </div>
  </>
  );
};

export default App;