import './reset.css';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import CheckAllAndRemaining from './components/CheckAllAndRemaining';
import TodoFilter from './components/TodoFilter';
import ClearCompletedBtn from './components/ClearCompletedBtn';
import { useCallback, useEffect, useState } from 'react';

function App() {

  let [todos, setTodos] = useState([]);
  let [filterTodo, setfilterTodo] = useState(todos);

  useEffect(()=>{
    fetch('http://localhost:3001/todos')
    .then(res=>res.json()) //json method give a promise, so then()
    .then((todos)=>{
      setTodos(todos);
      setfilterTodo(todos);
    })
  },[])

  let filterBy = useCallback( (filter) =>{ //using useCallback because infinite loop
    if(filter == 'All'){
      setfilterTodo(todos);
    }
    if(filter == 'Active'){
      setfilterTodo(todos.filter(t=> !t.completed));
    }
    if(filter == 'Completed'){
      setfilterTodo(todos.filter(t=> t.completed));
    }

  },[todos])

  let addTodo = (todo) =>{
    //update data at server side
    fetch('http://localhost:3001/todos',{
      method : "POST",
      headers : {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo)
    })

    //update data at client side
    setTodos(prevState => [...prevState,todo]) // ...prevState (array destructuring) //call previous state
  }

  let deleteTodo = (todoId) =>{
    //delete at server side
    fetch(`http://localhost:3001/todos/${todoId}`,{
      method : "DELETE"
    })
    //delete at client side
    setTodos(prevState => {
      return prevState.filter(todo => {
        return todo.id != todoId
      })
    })
  }

  let updateTodo = (todo) =>{ // todo is object , received
    //update at server side
    fetch(`http://localhost:3001/todos/${todo.id}`,{
      method : "PATCH",
      headers : {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo)
    })
    //update at client side
    setTodos(prevState => {
      return prevState.map(t => {
        if(t.id == todo.id){
          return todo
        }
        return t;
      })
      
    })
  }

  let remainingCount =  todos.filter(t => !t.completed).length;

  let checkAll = () => {
    //server side
    todos.forEach( t => {
      t.completed = true;
      updateTodo(t);
    })

    //client side
    setTodos((prevState) => {
      return prevState.map(t => {
        return {...t, completed:true}
      })
    })
  }

  let clearCompleted = () => {

    //server side
    todos.forEach( t => {
      if(t.completed){
        deleteTodo(t.id);
      }
    })


    //client side
    setTodos(prevState => {
      return prevState.filter(todo => {
        return todo.completed != true
      })
    })

  }

 
  
  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <TodoForm addTodo={addTodo} />
        

        <TodoList todos={filterTodo}  updateTodo={updateTodo} deleteTodo={deleteTodo} />
        
        <CheckAllAndRemaining checkAll={checkAll} remainingCount={remainingCount} />
        

        <div className="other-buttons-container">
         < TodoFilter filterBy={filterBy} />
          
          <ClearCompletedBtn clearCompleted={clearCompleted} />
          
        </div>
      </div>
    </div>
  );
}

export default App;
