import * as React from 'react';
import TodoList from './TodoList.jsx'
import AddTodoForm from './AddTodoForm.jsx'


function App() {
  return (
    <div>
      <h1>Todo list</h1>
        <AddTodoForm />
        <TodoList />
      <hr />

    </div>
  );
}

export default App;
