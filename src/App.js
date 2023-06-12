import "./App.css";
import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import Todolist from "./components/Todolist";

function App() {
  //State Stuff
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  //Runs once when page is loaded.
  useEffect(() => {
    getLocalTodos();
  }, []);

  //Runs everytime a new todo is added or status updated.
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  //Functions
  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed == true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed == false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  //Save to Local
  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  //Get from Local
  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let localTodos = JSON.parse(localStorage.getItem("todos"));
      console.log(localTodos);
      setTodos(localTodos);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Hammadh's Todolist</h1>
      </header>
      <Form
        inputText={inputText}
        setInputText={setInputText}
        todos={todos}
        setTodos={setTodos}
        setStatus={setStatus}
      />
      <Todolist
        todos={todos}
        setTodos={setTodos}
        filteredTodos={filteredTodos}
      />
    </div>
  );
}

export default App;
