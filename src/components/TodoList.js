import React from 'react'
import Todo from '../components/Todo'

export default function TodoList({todos, deleteTodo}) {
  return (
    <>
    <ul className="todo-list">
          
          {
            todos.map(todo =>(
              <Todo todo={todo} deleteTodo={deleteTodo} key={todo.id}/>
            ))
          }
          
        </ul>
    </>
  )
}
