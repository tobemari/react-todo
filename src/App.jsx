import * as React from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

const useSmiPersistantState = () => {
  const [todoList, setTodoList] = React.useState(
    JSON.parse(localStorage.getItem('savedTodoList')) || []);

  React.useEffect (() => {
  localStorage.setItem('savedTodoList', JSON.stringify(todoList))
  }, [todoList])

  return [todoList, setTodoList];
}

function App() {
  
  const [todoList, setTodoList] = useSmiPersistantState();

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };

  return (
    <>
      <h1>Todo List</h1>
      
      <AddTodoForm onAddTodo={addTodo} />
    
      <TodoList todoList = {todoList} /> 
    </>
  );
}

export default App; 