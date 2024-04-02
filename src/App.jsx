import * as React from 'react';
import TodoList from './TodoList.jsx'
import AddTodoForm from './AddTodoForm.jsx'


function App() {
  
  const [todoList, setTodoList] = React.useState([]);
  
  function addTodo (newTodo) {
    setTodoList([...todoList, newTodo]);
  }

  return (
    <div>
      <h1>Todo list</h1>
        <AddTodoForm onAddTodo={addTodo}/>
        
        <TodoList todoList={todoList}/>
      <hr />

    </div>
  );
}

export default App;
