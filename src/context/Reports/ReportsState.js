import React, { useReducer } from 'react'
import {
    CLEAR_MESSAGE
} from '../types'
import { ReportsContext } from './ReportsContext'
import { ReportsReducer } from './ReportsReducer'



export const ReportsState = ({ children }) => {
    const initialState = {
        message: null,
    }

    const dispatchRedux = useDispatch();
    const [state, dispatch] = useReducer(ReportsReducer, initialState)

    const clearMessage = (uid) => {
        dispatch({ type: CLEAR_MESSAGE, payload: { uid } })
    }

    return (
        <ReportsContext.Provider value={{
            message: state.message,

        }}>{children}</ReportsContext.Provider>)

}