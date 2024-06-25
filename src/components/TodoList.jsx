import React from 'react';
import TodoListItem from './TodoListItem';
import PropTypes from "prop-types";

const TodoList = ({ todoList, onRemoveTodo }) => (
  <ul>
    {todoList.map((item) => (
      <TodoListItem 
        key={item.id} 
        todo={item} 
        onRemoveTodo={onRemoveTodo}
      />
    ))}
  </ul> 
);

TodoList.propTypes = {
  todoList: PropTypes.array,
  onRemoveTodo: PropTypes.func
}

export default TodoList;