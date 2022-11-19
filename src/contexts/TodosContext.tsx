import { createContext } from 'react'
import { State, TodoAction, useTodos } from '../hooks/todos'

export const StateContext = createContext<State>([])
export const DispatchContext = createContext<React.Dispatch<TodoAction>>(
  () => {}
)

interface Props {
  children: JSX.Element[] | JSX.Element
}

export const TodosContext = ({ children }: Props) => {
  const [state, dispatch] = useTodos()
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}
