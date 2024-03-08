function AddTodoForm () {
    return (
        <div>
            <form>
                <label htimlFor="todoTitle">Title</label>
                <input id="todoTitle" />
                <input type="submit" value="Add" />
            </form>
        </div>
    );
}

export default AddTodoForm;