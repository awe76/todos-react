import React, { useReducer } from 'react'

let key = 1

export type Todo = {
  key: number
  title: string
  done: boolean
}

export type State = Todo[]

type Action<Type, Payload> = {
  type: Type
  payload: Payload
}

type AddAction = Action<'add', { title: string }>
type RemoveAction = Action<'remove', { key: number }>
type ToggleAction = Action<'toggle', { key: number }>
type EditAction = Action<'edit', { key: number; title: string }>
export type TodoAction = AddAction | RemoveAction | ToggleAction | EditAction

type replacer<Payload extends { key: number }> = (
  item: Todo,
  action: Payload
) => Todo

function replace<Payload extends { key: number }>(
  state: State,
  payload: Payload,
  repl: replacer<Payload>
) {
  return state.map(todo => {
    if (todo.key !== payload.key) {
      return todo
    } else {
      return repl(todo, payload)
    }
  })
}

const reduceTodos = (state: State, action: TodoAction): State => {
  switch (action.type) {
    case 'add':
      return [
        ...state,
        {
          key: key++,
          title: action.payload.title,
          done: false,
        },
      ]

    case 'remove':
      return state.filter(todo => todo.key !== action.payload.key)

    case 'toggle':
      return replace(state, action.payload, item => ({
        ...item,
        done: !item.done,
      }))

    case 'edit':
      return replace(state, action.payload, (item, payload) => ({
        ...item,
        title: payload.title,
      }))
  }
}

export const useTodos = (): [Todo[], React.Dispatch<TodoAction>] => {
  return useReducer(reduceTodos, undefined, () => [])
}
