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
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Helper function to reorder todo list array when drag and drop happens
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

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

  // Function to handle drag end
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const items = reorder(todos, result.source.index, result.destination.index);
    setTodos(items);
  };

  // Function to handle sorting
  const sortTodos = () => {
    const sortedTodos = [...todos].sort();
    setTodos(sortedTodos);
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
      <Button variant="contained" color="secondary" onClick={sortTodos}>
        Sort A-Z
      </Button>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <List {...provided.droppableProps} ref={provided.innerRef}>
              {todos.map((todo, index) => (
                <Draggable
                  key={index}
                  draggableId={index.toString()}
                  index={index}
                >
                  {(provided) => (
                    <ListItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
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
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
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
      </div>
    </div>
  );
};

export default TodoApp;
