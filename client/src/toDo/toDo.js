import React, { useState, useEffect } from "react";
import "./TodoApp.css"; // Import the CSS file

const TodoApp = () => {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [completedTodos, setCompletedTodos] = useState(
    JSON.parse(localStorage.getItem("completedTodos")) || []
  );
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
  }, [todos, completedTodos]);

  const addTodo = () => { 
    setTodos([...todos, input]);
    setInput("");
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const completeTodo = (index) => {
    const newTodos = [...todos];
    const completedTodo = newTodos.splice(index, 1);
    setTodos(newTodos);
    setCompletedTodos([...completedTodos, ...completedTodo]);
  };

  return (
    <div className="todo-app">
      <input
        className="todo-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="todo-button" onClick={addTodo}>
        Add
      </button>
      <div className="todo-lists">
        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={index} className="todo-item">
              {todo}
              <button className="todo-button" onClick={() => removeTodo(index)}>
                Remove
              </button>
              <button
                className="todo-button"
                onClick={() => completeTodo(index)}
              >
                Complete
              </button>
            </li>
          ))}
        </ul>
        <h2 className="todo-heading">Completed Todos</h2>
        <ul className="todo-list">
          {completedTodos.map((todo, index) => (
            <li key={index} className="todo-item">
              {todo}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;
