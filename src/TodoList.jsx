import * as React from 'react';
import TodoListItem from './TodoListItem.jsx';

const todoList = [
    {
      objectID: 1,
      title: "Complete assignment in time every week"
    },
    {
      objectID: 2,
      title: "Do exersises 30 min every day"
    },
    {
      objectID: 3,
      title: "Go to sleep before 11:30pm"
    }
  ]

function TodoList () {
  return (
    <ul>
      {todoList.map( function (item) {
        return ( 
          <TodoListItem key={item.objectID} item={item} />
        );   
        })}
    </ul>  
  );
}

export default TodoList;
