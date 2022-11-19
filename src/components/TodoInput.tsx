import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { DispatchContext } from '../contexts/TodosContext'

export const TodoInput = () => {
  const dispatch = useContext(DispatchContext)
  const [title, setTitle] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const setFocus = useCallback(() => {
    const { current } = inputRef
    if (current) {
      current.focus()
    }
  }, [inputRef])

  useEffect(setFocus, [setFocus])

  const addTodo = useCallback(() => {
    if (title !== '') {
      dispatch({
        type: 'add',
        payload: {
          title: title,
        },
      })
      setTitle('')
      setFocus()
    }
  }, [dispatch, title])

  const changeTitle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value)
    },
    [setTitle]
  )

  const enterTodo = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        addTodo()
      }
    },
    [addTodo]
  )

  return (
    <>
      <label>
        Add Todo
        <input
          type="text"
          ref={inputRef}
          value={title}
          onChange={changeTitle}
          onKeyDown={enterTodo}
        />
      </label>
      <button onClick={addTodo}>Add</button>
    </>
  )
}
