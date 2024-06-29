import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoContainer from "./components/TodoContainer";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <>
            <h1>Todo List</h1>
            <hr />
            <TodoContainer tableName={import.meta.env.VITE_TABLE_NAME} />
          </>
        }
      />
      <Route path="/new" element={<h1>New Todo List</h1>} />
    </Routes>
  </BrowserRouter>
);

export default App;
