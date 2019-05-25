import React, { Fragment, useState } from 'react';
import './App.css';

type FormElem = React.FormEvent<HTMLFormElement>

interface ITodo {
  text: string
  complete: boolean
}

function App(): JSX.Element {

  const [value, setValue] = useState<string>('')
  const [todos, setTodos] = useState<ITodo[]>([])

  const handleSubmit = (e: FormElem): void => {
    e.preventDefault()
    addTodo(value)
    setValue('')
  }

  const addTodo = (text: string): void => {
    const newTodos: ITodo[] = [...todos, { text, complete: false }]
    setTodos(newTodos)
  }

  const completeTodo = (index: number): void => {
    let updatedTodos = [...todos]
    updatedTodos[index].complete = !updatedTodos[index].complete
    setTodos(updatedTodos)
  }

  const removeTodo = (index: number): void => {
    let updatedTodos = [...todos]
    updatedTodos.splice(index, 1)
    setTodos(updatedTodos)
  }

  console.log(todos)

  return (
    <Fragment>
      <h1>Todo list</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' value={value} onChange={e => setValue(e.target.value)} required />
        <button type='submit'>Add Todo</button>
        <section>
          {
            todos.map(
              (todo: ITodo, index: number) =>
                <Fragment key={index}>
                  <div>{todo.text} ping</div>
                  <button type='button' onClick={() => completeTodo(index)}>{todo.complete ? 'completed' : 'not done'}</button>
                  <button type='button' onClick={() => removeTodo(index)}>Remove</button>
                </Fragment>

            )
          }
        </section>
      </form>
    </Fragment>
  );
}

export default App;
