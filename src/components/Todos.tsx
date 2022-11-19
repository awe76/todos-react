import { TodosContext } from '../contexts/TodosContext'
import { TodoInput } from './TodoInput'
import { TodoList } from './TodoList'

export const Todos = () => {
  return (
    <TodosContext>
      <TodoInput />
      <TodoList />
    </TodosContext>
  )
}
