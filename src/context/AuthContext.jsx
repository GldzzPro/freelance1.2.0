import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null
  })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    console.log({user} , "in auth context after parsing from local storage")
    console.log('AuthContext state:', state)
    if (user) {
      dispatch({ type: 'LOGIN', payload: user }) 
    }
  }, [])

  
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}