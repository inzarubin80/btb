import React, { useReducer } from 'react'
import {
    MAKET_PROJECTS_REQUEST,
    MAKET_PROJECTS_FAILURE,
    MAKET_PROJECTS_SUCCESS,
    CLEAR_MESSAGE,
    SET_PROJECT_ID,

    GET_PROJECT_REQUEST,
    GET_PROJECT_FAILURE,
    GET_PROJECT_SUCCESS

} from '../types'
import { MaketProjectContext } from './MaketProjectContext'
import { MaketProjectReducer } from './MaketProjectReducer'
import { executorRequests, getProjectsMakets, getProject } from '../../api/dataService1c';

import { useDispatch } from 'react-redux';

import { createMesage, alertTypes } from '../../utils/utils';

export const MaketProjectState = ({ children }) => {

    const initialState = {
        projects: [],
        projectsRequest: false,
        message: null,
        projectId: '',
        stagesProject: [],
        projectRequest: false,
        filds:[]


    }

    const dispatchRedux = useDispatch();
    const [state, dispatch] = useReducer(MaketProjectReducer, initialState)
    const constStandartLifetime = 3500;

    const projectsRequest = () => {
        return dispatch({ type: MAKET_PROJECTS_REQUEST })
    }

    const projectsFailure = (error) => {
        return dispatch({ type: MAKET_PROJECTS_FAILURE, payload: { mesage: createMesage(alertTypes.info, error, clearMessage, constStandartLifetime) } })
    }

    const projectsSuccess = (projects, filds) => {
        return dispatch({ type: MAKET_PROJECTS_SUCCESS, payload: { projects, filds} })
    }

    const clearMessage = (uid) => {
        dispatch({ type: CLEAR_MESSAGE, payload: { uid } })
    }

    const setProjectId = (projectId) => {
        
        dispatch({ type: SET_PROJECT_ID, payload: { projectId } })


        if (projectId) {


            projectRequest();


            const functionRequest = () => {
                return getProject(projectId)
            };

            const responseHandlingFunction = (json) => {
                getProjectSuccess(json.stagesProject, json.filds);
            }

            const exceptionHandlingFunction = (error) => {
                getProjectFailure(error);
            }

            executorRequests(functionRequest, responseHandlingFunction, exceptionHandlingFunction, dispatchRedux);
        } else {

            getProjectSuccess([], []);
        }




    }



    const getProjects = () => {

        projectsRequest();


        const functionRequest = () => {
            return getProjectsMakets()
        };

        const responseHandlingFunction = (json) => {

            projectsSuccess(json.projects);

        }

        const exceptionHandlingFunction = (error) => {
            projectsFailure(error);
        }

        executorRequests(functionRequest, responseHandlingFunction, exceptionHandlingFunction, dispatchRedux);

    };




    const projectRequest = () => {
        return dispatch({ type: GET_PROJECT_REQUEST })
    }


    const getProjectSuccess = (stagesProject, filds) => {
        return dispatch({ type: GET_PROJECT_SUCCESS, payload: { stagesProject, filds } })
    }


    const getProjectFailure = (error) => {
        return dispatch({ type: GET_PROJECT_FAILURE, payload: { mesage: createMesage(alertTypes.info, error, clearMessage, constStandartLifetime) } })
    }




    return (
        <MaketProjectContext.Provider value={{
            
            projects: state.projects,
            projectsRequest: state.projectsRequest,
            message: state.message,
            projectId: state.projectId,
            stagesProject:state.stagesProject,
            filds:state.filds,

            getProjects,
            setProjectId


        }}>{children}</MaketProjectContext.Provider>)

}