import React from "react";

const InputWithLabel = ({ id, todoTitle, handleTitleChange, children }) => {
  const inputRef = React.useRef();

  React.useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <>
      <label htmlFor="todoTitle">{children}</label>
      <br />
      <input
        id= {id}
        type="text"
        name="title"
        value={todoTitle}
        ref={inputRef}
        onChange={handleTitleChange}
      />
    </>
  );
};

export default InputWithLabel;