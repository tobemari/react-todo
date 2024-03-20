import * as React from 'react';

function AddTodoForm (props) {
    
    function handleAddTodo (event) {
        event.preventDefault();
        const todoTitle = event.target.title.value;
        event.target.reset();

        props.onAddTodo(todoTitle);
    }
    
    return (
        <div>
            <form onSubmit={handleAddTodo}>
                <label htmlFor="todoTitle">Title</label>
                <input id="todoTitle" name="title"/>
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default AddTodoForm;
