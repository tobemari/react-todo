import { useState } from 'react';


function AddTodoForm({onAddTodo}) {

    const [todoTitle, setTodoTitle] = useState('');

    const handleTitleChange = (event) => {
        const newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    };

    const handleAddTodo = (event) => {
        event.preventDefault();

        console.log(todoTitle);
        onAddTodo({ title: todoTitle, id: Date.now() });
        setTodoTitle('');    
    
    };

    return (
        <div>
            <form onSubmit={handleAddTodo}>
                <label htmlFor="todoTitle">Title: </label>
                <input id="todoTitle" type='Text' name='title' value={todoTitle} onChange={handleTitleChange}></input>
                <button type='submit'>Add</button>
            </form>
        </div>
    );
    
}

export default AddTodoForm;