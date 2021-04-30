import React, { useReducer } from 'react'
import {

    OPEN_EDIT_TASK_REQUEST,
    OPEN_EDIT_TASK_FAILURE,
    OPEN_EDIT_TASK_SUCCESS,
    OPEN_CARD_MAKET_REQUEST,
    OPEN_CARD_MAKET_FAILURE,
    OPEN_CARD_MAKET_SUCCESS,
    SWITCH_TAB

} from '../types'
import { MaketCardContext } from './MaketCardContext'
import { MaketCardReducer } from './MaketCardReducer'
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { executorRequests, getMaket, getImgMaket, saveFileСonfirmation, revisionMaket, сonfirmationMaket, saveTask, getFileTask } from '../../api/dataService1c';
import htmlToDraft from 'html-to-draftjs';

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
        editorState: React.useState(EditorState.createEmpty()),
        idTaskChange: null,
        taskChangeFiles: [],
        taskEditingOpens: false,

        //carent tab
        indexСurrentTab: 0,

    }



    
    const [state, dispatch] = useReducer(MaketCardReducer, initialState)

    const switchTab = (indexСurrentTab) =>{
        dispatch({ type: OPEN_EDIT_TASK_REQUEST, payload:{indexСurrentTab}})
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

    const openCard = (id, dispatchRedux) => {

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

    const openChangeTask = (uid, id, dispatchRedux) => {

        requestEditTask();

        const functionRequest = () => {
            return getMaket(id)
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



    return (
        <MaketCardContext.Provider value={{
            maket: state.maket,
            message: state.message,
            idTaskChange: state.idTaskChange,
            taskChangeFiles: state.taskChangeFiles,
            taskEditingOpens: state.taskEditingOpens,
            indexСurrentTab:state.indexСurrentTab,
            openCard,
            openChangeTask,
            switchTab,

        }}>{children}</MaketCardContext.Provider>)

}