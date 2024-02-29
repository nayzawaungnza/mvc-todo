import React from 'react'
import Todo from '../components/Todo'

export default function TodoList({todos,  updateTodo, deleteTodo}) {
  return (
    <>
    <ul className="todo-list">
          
          {
            todos.map(todo =>(
              <Todo todo={todo}  updateTodo={updateTodo} deleteTodo={deleteTodo} key={todo.id}/>
            ))
          }
          
        </ul>
    </>
  )
}
