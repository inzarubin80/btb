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
    REMOVE_PROJECT_FILE,
    EDITING_HTML_TEXT

} from '../types'

import { MaketProjectContext } from './MaketProjectContext'
import { MaketProjectReducer } from './MaketProjectReducer'
import { executorRequests, getProjectsMakets, getProject, nextStepProject } from '../../api/dataService1c';
import { useDispatch } from 'react-redux';
import { createMesage, alertTypes } from '../../utils/utils';

import { EditorState, ContentState, convertToRaw } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html'

export const MaketProjectState = ({ children }) => {

    const initialState = {

        projects: [],
        projectsRequest: false,
        message: null,
        projectId: '',
        stagesProject: [],
        projectRequest: false,
        filds: [],
        objectImage: {},
        stageRequest: false,
        currentStage: 0,

    }

    const dispatchRedux = useDispatch();
    const [state, dispatch] = useReducer(MaketProjectReducer, initialState)
    const constStandartLifetime = 3500;


    //utils////////////////////////////////////////////////////////////////////////////////////////////////
    const transformObjectImageFrom1c = (filds, objectImage1c) =>{

        let objectImage = {...objectImage1c};

        filds.forEach(fild => {

            if (fild.type == 'htmlText'){
            const contentBlock = htmlToDraft(objectImage1c[fild.id]);
            
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                objectImage[fild.id]  = EditorState.createWithContent(contentState);
            } else {
                objectImage[fild.id]  = EditorState.createEmpty();
            }
        }    
        });
        return objectImage;
    }


    const transformObjectImageTo1c = (filds, objectImage) =>{

        let objectImage1c = {...objectImage};

        filds.forEach(fild => {
            if (fild.type == 'htmlText'){
            objectImage1c[fild.id]  = draftToHtml(convertToRaw(objectImage1c[fild.id].getCurrentContent()));
        }    
        });
        
        return objectImage1c;

    }

    //ProjectFile ////////////////////////////////////////////////////////////////////////////////////////
    const addProjectFile = (file) => {
        dispatch({ type: ADD_PROJECT_FILE, payload: file })
    }


    const removeProjectFile = (uid) => {
        dispatch({ type: REMOVE_PROJECT_FILE, payload: uid })
    }


    //nextStage ////////////////////////////////////////////////////////////////////////////////////////

    const nextStageRequest = () => {
        return dispatch({ type: NEXT_STAGE_REQUEST })
    }
    const nextStageFailure = (error) => {
        return dispatch({ type: NEXT_STAGE_FAILURE, payload: { mesage: createMesage(alertTypes.info, error, clearMessage, constStandartLifetime) } })
    }

    const nextStageSuccess = (filds, currentStage, objectImage1c) => {
        let objectImage = transformObjectImageFrom1c(filds, objectImage1c);
        objectImage.files = state.objectImage.files;
        return dispatch({ type: NEXT_STAGE_SUCCESS, payload: { filds, currentStage, objectImage } })
    }

    const nextStage = (progress) => {

        nextStageRequest();

        let objectImage1c =  transformObjectImageTo1c(state.filds, state.objectImage);
       
        const functionRequest = () => {
            return nextStepProject(state.projectId, state.currentStage, objectImage1c, progress)
        };

        const responseHandlingFunction = (json) => {

            if (json.error) {
                nextStageFailure(json.error);
            } else {
                nextStageSuccess(json.filds, json.currentStage, json.objectImage);
            }

        }

        const exceptionHandlingFunction = (error) => {
            nextStageFailure(error);
        }

        executorRequests(functionRequest, responseHandlingFunction, exceptionHandlingFunction, dispatchRedux);

    }

    //changeProjectField////////////////////////////////////////////////////////////////////////////////////////////////

    const changeProjectField = (fildId, fildValue) => {

        return dispatch({ type: CHANGE_PROJECT_FIELD, payload: { fildId, fildValue } })
    }



    //GET PROJECTS LIST///////////////////////////////////////////////////////////////////////////////////////////////////
    

    const projectsRequest = () => {
        return dispatch({ type: MAKET_PROJECTS_REQUEST })
    }

    const projectsFailure = (error) => {
        return dispatch({ type: MAKET_PROJECTS_FAILURE, payload: { mesage: createMesage(alertTypes.info, error, clearMessage, constStandartLifetime) } })
    }

    const projectsSuccess = (projects, filds) => {
        return dispatch({ type: MAKET_PROJECTS_SUCCESS, payload: { projects, filds } })
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


    //clearMessage///////////////////////////////////////////////////////////////////////////////////////////

    const clearMessage = (uid) => {
        dispatch({ type: CLEAR_MESSAGE, payload: { uid } })
    }



    //SELECT Project///////////////////////////////////////////////////////////////////////////////////////////////////////
    const projectRequest = () => {
        return dispatch({ type: GET_PROJECT_REQUEST })
    }

    const getProjectSuccess = (stagesProject, filds, objectImage1c) => {
        let objectImage =  transformObjectImageFrom1c(filds, objectImage1c);
        return dispatch({ type: GET_PROJECT_SUCCESS, payload: { stagesProject, filds, objectImage}})
    }


    const getProjectFailure = (error) => {
        return dispatch({ type: GET_PROJECT_FAILURE, payload: { mesage: createMesage(alertTypes.info, error, clearMessage, constStandartLifetime) } })
    }


    const setProjectId = (projectId) => {

        dispatch({ type: SET_PROJECT_ID, payload: { projectId } })


        if (projectId) {


            projectRequest();


            const functionRequest = () => {
                return getProject(projectId)
            };

            const responseHandlingFunction = (json) => {

                console.log('filds from 1c.......', json);
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

 
    

    return (
        <MaketProjectContext.Provider value={{

            projects: state.projects,
            projectsRequest: state.projectsRequest,
            message: state.message,
            projectId: state.projectId,
            stagesProject: state.stagesProject,
            filds: state.filds,
            objectImage: state.objectImage,
            currentStage: state.currentStage,
            getProjects,
            setProjectId,
            changeProjectField,
            nextStage,
            addProjectFile,
            removeProjectFile


        }}>{children}</MaketProjectContext.Provider>)

}