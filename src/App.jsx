import * as React from 'react';

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

function App() {
  return (
    <div>
      <h1>Todo list</h1>

      <hr />

      <ul>
        {todoList.map(function (item) {
          return (
            <li key={item.objectID}>
              <span>{item.objectID}. </span>
              <span>{item.title}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App
