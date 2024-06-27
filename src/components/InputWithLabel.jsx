import React from "react";
import PropTypes from "prop-types";

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
        id={id}
        type="text"
        name="title"
        value={todoTitle}
        ref={inputRef}
        onChange={handleTitleChange}
      />
    </>
  );
};

InputWithLabel.propTypes = {
  id: PropTypes.number,
  todoTitle: PropTypes.string.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default InputWithLabel;
