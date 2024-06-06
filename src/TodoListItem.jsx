import item from "./TodoList";


function TodoListItem ({ todo, onRemoveTodo }) {
  const RemoveButton = () => {
    onRemoveTodo(todo.id);
  };
  return  (
    <li>
      <span>{todo.title}</span>
      <button type="button" onClick={RemoveButton}>Remove</button>
    </li>
  );
}

export default TodoListItem;