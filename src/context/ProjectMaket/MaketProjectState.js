import React, { useReducer } from 'react'
import {
    MAKET_PROJECTS_REQUEST,
    MAKET_PROJECTS_FAILURE,
    MAKET_PROJECTS_SUCCESS,
    CLEAR_MESSAGE,
    SET_PROJECT_ID,

    GET_PROJECT_REQUEST,
    GET_PROJECT_FAILURE,
    GET_PROJECT_SUCCESS,
    CHANGE_PROJECT_FIELD,

    NEXT_STAGE_REQUEST,
    NEXT_STAGE_FAILURE,
    NEXT_STAGE_SUCCESS,

    ADD_PROJECT_FILE,
    REMOVE_PROJECT_FILE

} from '../types'
import { MaketProjectContext } from './MaketProjectContext'
import { MaketProjectReducer } from './MaketProjectReducer'
import { executorRequests, getProjectsMakets, getProject,nextStepProject} from '../../api/dataService1c';

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
        filds:[],
        objectImage:{},
        stageRequest: false,
        currentStage: 0

    }

    const dispatchRedux = useDispatch();
    const [state, dispatch] = useReducer(MaketProjectReducer, initialState)
    const constStandartLifetime = 3500;



    const addProjectFile = (file) => {
        dispatch({ type: ADD_PROJECT_FILE, payload: file })
    }


    const removeProjectFile = (uid) => {
        dispatch({ type: REMOVE_PROJECT_FILE, payload: uid })
    }



    const nextStageRequest = () => {
        return dispatch({ type: NEXT_STAGE_REQUEST})
    }
    const nextStageFailure = (error) =>{
        return dispatch({ type: NEXT_STAGE_FAILURE, payload: { mesage: createMesage(alertTypes.info, error, clearMessage, constStandartLifetime) }})
    }

    const nextStageSuccess = (filds, currentStage, objectImage) => {
        return dispatch({ type: NEXT_STAGE_SUCCESS, payload: {filds, currentStage, objectImage}})
    }
    
    const nextStage = (progress) => {
        
        nextStageRequest();

        const functionRequest = () => {
            return nextStepProject(state.projectId, state.currentStage, state.objectImage, progress)
        };

        const responseHandlingFunction = (json) => {
            
            if (json.error) {
                nextStageFailure(json.error);
            }else
            {
                nextStageSuccess(json.filds, json.currentStage,  json.objectImage); 
            }
            
        }

        const exceptionHandlingFunction = (error) => {
            nextStageFailure(error);
        }

        executorRequests(functionRequest, responseHandlingFunction, exceptionHandlingFunction, dispatchRedux);

    }



    const changeProjectField = (fildId, fildValue) =>{

        return dispatch({ type: CHANGE_PROJECT_FIELD, payload: { fildId, fildValue}  })
    }


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
                getProjectSuccess(json.stagesProject, json.filds, json.objectImage);
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


    const getProjectSuccess = (stagesProject, filds, objectImage) => {
        return dispatch({ type: GET_PROJECT_SUCCESS, payload: { stagesProject, filds, objectImage} })
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
            objectImage:state.objectImage,
            currentStage:state.currentStage,
            getProjects,
            setProjectId,
            changeProjectField,
            nextStage,
            addProjectFile,
            removeProjectFile


        }}>{children}</MaketProjectContext.Provider>)

}