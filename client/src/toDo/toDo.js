import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ReplayIcon from "@material-ui/icons/Replay";

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

  const uncompleteTodo = (index) => {
    const newCompletedTodos = [...completedTodos];
    const uncompletedTodo = newCompletedTodos.splice(index, 1);
    setCompletedTodos(newCompletedTodos);
    setTodos([...todos, ...uncompletedTodo]);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <TextField
        fullWidth
        label="New Todo"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={addTodo}>
        Add
      </Button>
      <List>
        {todos.map((todo, index) => (
          <ListItem key={index}>
            <ListItemText primary={todo} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => removeTodo(index)}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="complete"
                onClick={() => completeTodo(index)}
              >
                <CheckCircleOutlineIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <h2>Completed Todos</h2>
      <List>
        {completedTodos.map((todo, index) => (
          <ListItem key={index}>
            <ListItemText primary={todo} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="uncomplete"
                onClick={() => uncompleteTodo(index)}
              >
                <ReplayIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default TodoApp;
