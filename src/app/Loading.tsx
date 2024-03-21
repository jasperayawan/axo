import React, { useReducer } from 'react'

const initialState = {
    email: "",
    password: "",
    isAdmin: false
}

export default function Loading() {
    const reducer = (state:any, action:any) => (
        {
            ...state,
            ...action
        }
    )
    const [{ email, password, isAdmin }, dispatchState] = useReducer(reducer, initialState);

  return (
    <div>
      
    </div>
  )
}
