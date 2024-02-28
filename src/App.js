import './reset.css';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import CheckAllAndRemaining from './components/CheckAllAndRemaining';
import TodoFilter from './components/TodoFilter';
import ClearCompletedBtn from './components/ClearCompletedBtn';
import { useEffect, useState } from 'react';

function App() {

  let [todos, setTodos] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:3001/todos')
    .then(res=>res.json()) //json method give a promise, so then()
    .then((todos)=>{
      setTodos(todos);
    })
  },[])

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <TodoForm/>
        

        <TodoList todos={todos} />
        
        <CheckAllAndRemaining/>
        

        <div className="other-buttons-container">
         < TodoFilter/>
          
          <ClearCompletedBtn/>
          
        </div>
      </div>
    </div>
  );
}

export default App;
