import React from "react";
import styles from "./TodoListItem.module.css";
import check from "../assets/pig-svgrepo-com.svg";
import PropTypes from "prop-types";


const TodoListItem = ({ todo, onRemoveTodo }) => {
  const handleOnRemove = () => {
    onRemoveTodo(todo.id);
  };

  return (
    <li className={styles.listItem}>
       <span>
          {todo.title}
      </span>
      <span>
        <button 
          type="button" 
          onClick={handleOnRemove}
        >
          <img src={check} className={styles.checkLogo} alt="Check logo" />
        </button>
      </span>
    </li>
  );
};

TodoListItem.propTypes = {
  todoLtodoist: PropTypes.string,
  onRemoveTodo: PropTypes.func
}

export default TodoListItem;