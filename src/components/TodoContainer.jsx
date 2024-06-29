
import React from 'react';
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import styles from "./TodoListItem.module.css";


const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
const authorization = `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`;

const TodoContainer = () => {
    const [todoList, setTodoList] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [sortOrder, setSortOrder] = React.useState('asc');

    React.useEffect(() => {
        fetchData();
    }, [sortOrder]); 

    const fetchData = async () => {
    const options = {
        method: "GET",
        headers: {
        Authorization: authorization,
        },
    };

        try {
            const response = await fetch(`${url}?view=Grid%20view&sort[0][field]=title&sort[0][direction]=${sortOrder}`, options);

            if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
            }  

            const data = await response.json();

            const todos = data.records.map((todo) => {
            return {
                id: todo.id,
                title: todo.fields.title,
                completedAt: todo.fields.completedAt,
            };
            });

            setTodoList(todos);
            setIsLoading(false);
        } catch (error) {
            console.log(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
    fetchData();
    }, []);

    const postTodo = async (title) => {
    const airtableData = {
        fields: {
        title,
        },
    };

    const options = {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
        },
        body: JSON.stringify(airtableData),
    };

    try {
        const response = await fetch(url, options);

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
        return null;
    }
    };

    const addTodo = (newTodo) => {
    postTodo(newTodo.title);
    };

    const removeTodo = async (id) => {
    const removeUrl = `${url}/${id}`;
    const options = {
        method: "DELETE",
        headers: {
        Authorization: authorization
        },
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

     const toggleSortOrder = () => {
        setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
    };

  return (
        <>
            <AddTodoForm onAddTodo={addTodo} />
            <button onClick={toggleSortOrder} className={styles.sortButton}>Sort Order</button>
            {isLoading ? (
                <p>Loading ...</p>
            ) : (
                <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
            )}
        </>
  );
}

export default TodoContainer;
