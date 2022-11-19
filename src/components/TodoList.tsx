import { useContext, memo } from 'react'
import { StateContext } from '../contexts/TodosContext'
import { State } from '../hooks/todos'
import { TodoItem } from './TodoItem'

interface Props {
  state: State
}

const TodoListContent = memo(({ state }: Props) => {
  return (
    <ul>
      {state.map(todo => (
        <TodoItem item={todo} />
      ))}
    </ul>
  )
})

export const TodoList = () => {
  const state = useContext(StateContext)

  return <TodoListContent state={state} />
}
