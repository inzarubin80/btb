import React, { useReducer } from 'react'
import {

    OPEN_EDIT_TASK_REQUEST,
    OPEN_EDIT_TASK_FAILURE,
    OPEN_EDIT_TASK_SUCCESS,
    OPEN_CARD_MAKET_REQUEST,
    OPEN_CARD_MAKET_FAILURE,
    OPEN_CARD_MAKET_SUCCESS,
    SWITCH_TAB,
    REMOVE_TASK_FILE,
    ADD_TASK_FILE,
    EDITING_HTML_TEXT

} from '../types'
import { MaketCardContext } from './MaketCardContext'
import { MaketCardReducer } from './MaketCardReducer'
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { executorRequests, getMaket, getImgMaket, saveFileСonfirmation, revisionMaket, сonfirmationMaket, saveTask, getFileTask } from '../../api/dataService1c';
import htmlToDraft from 'html-to-draftjs';
import {useDispatch} from 'react-redux';

export const MaketCardState = ({ children }) => {

    const initialState = {

        error: null,
        maket: null,
        fileBase64: null,
        fileIsOpenForViewing: false,
        message: '',


        //card open
        cardOpens: false,

        //task open
        editorState: EditorState.createEmpty(),
        idTaskChange: null,
        taskChangeFiles: [],
        taskEditingOpens: false,

        //carent tab
        indexСurrentTab: 0,

    }


    const dispatchRedux = useDispatch();
    
    const [state, dispatch] = useReducer(MaketCardReducer, initialState)


    const editingHtmlText = (newEditorState)  => {
        dispatch({ type: EDITING_HTML_TEXT, payload:newEditorState})
    }


    const switchTab = (indexСurrentTab) =>{
        dispatch({ type: SWITCH_TAB, payload:{indexСurrentTab}})
    }

 

    const requestEditTask = () => {
        dispatch({ type: OPEN_EDIT_TASK_REQUEST })
    };

    const requestEditFailure = (err, maket = null) => {
        if (maket) {
            dispatch({ type: OPEN_EDIT_TASK_FAILURE, payload: { message: err, maket } })
        } else {
            dispatch({ type: OPEN_EDIT_TASK_FAILURE, payload: { message: err } })
        }
    };

    const requestEditSuccess = (maket, idTaskChange, taskChangeFiles, editorState) => {
         dispatch({ type: OPEN_EDIT_TASK_SUCCESS, payload: { maket, idTaskChange, taskChangeFiles, editorState } })
    };

    const openCardMaketRequest = () => {
        dispatch({ type: OPEN_CARD_MAKET_REQUEST })
    }
    const openCardMaketFailure = (message) => {
        dispatch({ type: OPEN_CARD_MAKET_FAILURE, payload: { message } })
    }
    const openCardMaketSuccess = (maket) => {
        dispatch({ type: OPEN_CARD_MAKET_SUCCESS, payload: { maket } })
    }

    const openCard = (id) => {

        openCardMaketRequest();

        const functionRequest = () => {
            return getMaket(id)
        };

        const responseHandlingFunction = (json) => {
            if (!json.error) {
                openCardMaketSuccess(json.maket);
            } else {
                openCardMaketFailure(json.error)
            }
        };

        const exceptionHandlingFunction = (err) => { openCardMaketSuccess(err) }

        executorRequests(functionRequest, responseHandlingFunction, exceptionHandlingFunction, dispatchRedux);

    }

    const openChangeTask = (uid) => {

        requestEditTask();

        const functionRequest = () => {
            return getMaket(state.maket.code)
        };

        const responseHandlingFunction = (json) => {
            if (!json.error) {
                let task = json.maket.tasks.find((task) => task.uid == uid);

                if (task) {
                    let newEditorState = EditorState.createEmpty();
                    const contentBlock = htmlToDraft(task.text);
                    if (contentBlock) {
                        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                        newEditorState = EditorState.createWithContent(contentState);
                    };

                    requestEditSuccess(json.maket, uid, task.files, newEditorState);
                }
            } else {
                requestEditFailure(json.error, json.maket);
            }
        };

        const exceptionHandlingFunction = () => { }
        executorRequests(functionRequest, responseHandlingFunction, exceptionHandlingFunction, dispatchRedux);
    }


    const removeTaskFile = (uid) =>{
        dispatch({type: REMOVE_TASK_FILE, payload: uid})
    }

    const addTaskFile=(file)=>{
        dispatch({ type: ADD_TASK_FILE, payload:file})
    }
    

    return (
        <MaketCardContext.Provider value={{
            maket: state.maket,
            message: state.message,
            idTaskChange: state.idTaskChange,
            taskChangeFiles: state.taskChangeFiles,
            taskEditingOpens: state.taskEditingOpens,
            indexСurrentTab:state.indexСurrentTab,
            editorState:state.editorState,
            openCard,
            openChangeTask,
            switchTab,
            removeTaskFile,
            addTaskFile,
            editingHtmlText

        }}>{children}</MaketCardContext.Provider>)

}