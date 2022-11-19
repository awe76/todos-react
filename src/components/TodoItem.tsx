import { useCallback, useContext, memo, ChangeEvent } from 'react'
import { DispatchContext } from '../contexts/TodosContext'
import { Todo } from '../hooks/todos'
import './TodoItem.css'

interface Props {
  item: Todo
}

export const TodoItem = memo(({ item: { key, title, done } }: Props) => {
  const dispatch = useContext(DispatchContext)

  const removeTodo = useCallback(() => {
    dispatch({
      type: 'remove',
      payload: {
        key,
      },
    })
  }, [dispatch, key])

  const toggleTodo = useCallback(() => {
    dispatch({
      type: 'toggle',
      payload: {
        key,
      },
    })
  }, [dispatch, key])

  const editTodo = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: 'edit',
        payload: {
          key,
          title: e.target.value,
        },
      })
    },
    [dispatch, key]
  )

  return (
    <li key={key}>
      <input type="checkbox" defaultChecked={done} onChange={toggleTodo} />
      <input type="text" value={title} onChange={editTodo} />
      <button onClick={removeTodo}>del</button>
    </li>
  )
})
