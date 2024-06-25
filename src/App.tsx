import React, { useState, useEffect } from "react"; // Можно импортировать сразу методы реакта что бы сто раз не писать React.траляля
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//---------------- Тут инициализируем все конфигурационные переменные --------------------------

// VITE_AIRTABLE_BASE_ID, VITE_TABLE_NAME и VITE_AIRTABLE_API_TOKEN испортируются из Переменных Окружения Vite (см. файл .env)
const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
const authorization = `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`;

const getOptions = {
  method: "GET",
  headers: {
    Authorization: authorization,
  },
}; // Опции можем тоже инициализировать вместе с остальными параметрами - они же не меняются при исполнении кода

const App = () => {
  const [todoList, setTodoList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingError, setIsLoadingError] = useState(false); // Добавим еще флаг, что бы его установить при ошибке и вывести сообщение снизу в рендере

  const [isPosting, setIsPosting] = useState(false);
  const [isPostingError, setIsPostingError] = useState(false); // Добавим еще два флага для того, что бы показывать лоадер и ошибку при отправке данных

  const fetchTodos = async () => {
    try {
      setIsLoadingError(false);
      setIsLoading(true);
      const response = await fetch(url, getOptions); // Делаем запрос по URL из переменной url

      if (!response.ok) {
        // Если в ответе от сервера ошибка - инициируем ошибку нашего приложения, что бы дальше не исполнялся код
        throw new Error(`Error: ${response.status}`); // Инициация ошибки кидает исполнение кода сразу в блок catch
      }

      const data = await response.json();

      const todos = data.records.map((todo: any) => {
        return {
          id: todo.id,
          title: todo.fields.title,
          completedAt: todo.fields.completedAt,
        };
      });
      setTodoList(todos);
      setIsLoadingError(false);
      // setIsLoading(false); - Не нужно, все равно выполнится блок finally - а там уже есть setIsLoading(false), зачем вызывать два раза :)
    } catch (error) {
      console.log(error.message);
      setIsLoadingError(true)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos(); // Запускаем функцию загрузки данных
  }, []); // Запускаем один раз при первом рендере компонента т.к. dependancy array пустой ([])

  const remoteCreateTodo = async (title: any) => {
    const airtableData = {
      fields: {
        title,
      },
    };

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      },
      body: JSON.stringify(airtableData),
    };

    try {
      setIsPostingError(false); // На всякий случайперед отправкой сбросим флаг "Ошибка произошла" - вдруг второй раз нажали кнопку
      setIsPosting(true); // Включаем лоадер перед началом отправки

      const response = await fetch(url, postOptions);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const dataResponse = await response.json();

      const newTodo = {
        id: dataResponse.id,
        title: dataResponse.fields.title,
      };
      setTodoList([...todoList, newTodo]);
    } catch (error) {
      console.log(error.message);
      setIsPostingError(true); // Устанавливаем флаг "Ошибка произошла"
      return null;
    } finally {
      setIsPosting(false); // Выключаем после отправки
      return null;
    }
  };

  const addTodo = (newTodo: any) => {
    remoteCreateTodo(newTodo.title);
  };

  const removeTodo = async (id: any) => {
    const removeUrl = `${url}/${id}`;
    const options = {
      method: "DELETE",
      headers: { Authorization: authorization },
    };
    try {
      const response = await fetch(removeUrl, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const modifiedTodoList = todoList.filter((todo) => todo.id !== id);
      setTodoList(modifiedTodoList);
    } catch (error) {
      console.error("Error removing todo:", error.message);
    }
  };

  const renderLoader = () => {
    return (<p>Loading ...</p>)
  }

  const renderError = () => {
    return (
      <div>
        <p>initial request error :(</p>
        <button onClick={fetchTodos}>Retry</button>
      </div>
    )
  }

  const renderNewTodoError = () => {
    return (
      <div>
        <p>Todo creation failed :(</p>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <h1>Todo List</h1>
            <AddTodoForm onAddTodo={addTodo} />
            <hr />
            {isLoading && isPosting && renderLoader()}
            {!isLoading && isLoadingError && renderError()}
            {!isPosting && isPostingError && renderNewTodoError()}
            {!isLoading && !isLoadingError && <TodoList todoList={todoList} onRemoveTodo={removeTodo} />}
          </>
        }/>
        <Route path='/new' element={
          <h1>New Todo List</h1>
        }/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;