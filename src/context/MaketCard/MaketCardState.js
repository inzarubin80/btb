import React, { useReducer} from 'react'
import {
    SHOW_LOADER
} from '../types'
import { MaketCardContext } from './MaketCardContext'
import { MaketCardReducer } from './MaketCardReducer'

export const MaketCardState = ({ children }) => {

    const initialState = {
          error: null,
        }

    const [state, dispatch] = useReducer(MaketCardReducer, initialState)


    const showLoader = () => dispatch({ type: SHOW_LOADER })
    
    
    return (
        <MaketCardContext.Provider value={{
            error: state.error, 
            showLoader       
        }}>{children}</MaketCardContext.Provider>)
}