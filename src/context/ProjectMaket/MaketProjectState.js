import React, { useReducer } from 'react'
import {
    MAKET_PROJECTS_REQUEST,
    MAKET_PROJECTS_FAILURE,
    MAKET_PROJECTS_SUCCESS,
    CLEAR_MESSAGE
} from '../types'
import { MaketProjectContext } from './MaketProjectContext'
import { MaketProjectReducer } from './MaketProjectReducer'
import { executorRequests, getProjectsMakets } from '../../api/dataService1c';

import { useDispatch } from 'react-redux';

import { createMesage, alertTypes } from '../../utils/utils';

export const MaketProjectState = ({ children }) => {

    const initialState = {
        projects: [],
        projectsRequest: false,
        message: null
    }

    const dispatchRedux = useDispatch();
    const [state, dispatch] = useReducer(MaketProjectReducer, initialState)
    const constStandartLifetime = 3500;

    const projectsRequest = () => {
        return { type: MAKET_PROJECTS_REQUEST }
    }

    const projectsFailure = (error) => {
        return { type: MAKET_PROJECTS_FAILURE, payload: { mesage: createMesage(alertTypes.info, error, clearMessage, constStandartLifetime) } }
    }

    const projectsSuccess = (projects) => {
        return { type: MAKET_PROJECTS_SUCCESS, payload: { projects } }
    }


    const clearMessage = (uid) => {
        dispatch({ type: CLEAR_MESSAGE, payload: { uid } })
    }

    const getProjects = () => {

        dispatch(projectsRequest());


        const functionRequest = () => {
            return getProjectsMakets()
        };

        const responseHandlingFunction = (json) => {

           dispatch(projectsSuccess(json.projects));

        }

        const exceptionHandlingFunction = (error) => {
            dispatch(projectsFailure(error));
        }

        executorRequests(functionRequest, responseHandlingFunction, exceptionHandlingFunction, dispatchRedux);

    };



    return (
        <MaketProjectContext.Provider value={{
            projects: state.projects,
            projectsRequest: state.projectsRequest,
            message: state.message,

            getProjects,

        }}>{children}</MaketProjectContext.Provider>)

}