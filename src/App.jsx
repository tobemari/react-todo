import * as React from 'react';
import TodoList from './TodoList.jsx'
import AddTodoForm from './AddTodoForm.jsx'


function App() {
  
  const [newTodo, setNewTodo] = React.useState('');
  
  return (
    <div>
      <h1>Todo list</h1>
        <AddTodoForm onAddTodo={setNewTodo}/>
        <p>
          {newTodo}
        </p>
        <TodoList />
      <hr />

    </div>
  );
}
export default App;
