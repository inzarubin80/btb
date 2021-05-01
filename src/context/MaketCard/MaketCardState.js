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
    EDITING_HTML_TEXT,
    SAVE_TASK_REQUEST,
    SAVE_TASK_FAILURE,
    SAVE_TASK_SUCCESS,
    CANCEL_TASK_EDITING
    } from '../types'
import { MaketCardContext } from './MaketCardContext'
import { MaketCardReducer } from './MaketCardReducer'
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { executorRequests, getMaket, getImgMaket, saveFileСonfirmation, revisionMaket, сonfirmationMaket, saveTask, getFileTask } from '../../api/dataService1c';
import htmlToDraft from 'html-to-draftjs';
import { useDispatch } from 'react-redux';
import draftToHtml from 'draftjs-to-html'

export const MaketCardState = ({ children }) => {

    const initialState = {

        error: null,
        maket: null,
        fileBase64: null,
        fileIsOpenForViewing: false,
        message: '',


        //card open
        cardOpens: false,

        //task 
        editorState: null,
        idTaskChange: null,
        taskChangeFiles: [],
        taskEditingOpens: false,
        taskSaved: false,


        //carent tab
        indexСurrentTab: 0,

    }


    const dispatchRedux = useDispatch();
    const [state, dispatch] = useReducer(MaketCardReducer, initialState)



    const editingHtmlText = (newEditorState) => {
        dispatch({ type: EDITING_HTML_TEXT, payload: newEditorState })
    }

    const switchTab = (indexСurrentTab) => {
        dispatch({ type: SWITCH_TAB, payload: { indexСurrentTab } })
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


    const removeTaskFile = (uid) => {
        dispatch({ type: REMOVE_TASK_FILE, payload: uid })
    }

    const addTaskFile = (file) => {
        dispatch({ type: ADD_TASK_FILE, payload: file })
    }

    const saveTaskRequest = () => {
        dispatch({ type: SAVE_TASK_REQUEST })
    }
    const saveTaskFailure = (err, maket=null) => {
        if (maket) {
            dispatch({ type: SAVE_TASK_FAILURE, payload: {message: err, maket} })   
        } else {
            dispatch({ type: SAVE_TASK_FAILURE, payload: { message: err } })
        }
      
    }
    const saveTaskSuccess = (maket) => {
        dispatch({ type: SAVE_TASK_SUCCESS, payload: {maket}})
    }
  
    
    const cancelTaskEditing = () => {
        dispatch({ type: CANCEL_TASK_EDITING})
    }
   


    const handleSaveTask = () => {

        
        let number = 0;
        if ( state.idTaskChange != '-1') {
            number = state.maket.tasks.find((task) => task.uid == state.idTaskChange).number;
        }

        const taskTextValueHTML = draftToHtml(convertToRaw(state.editorState.getCurrentContent()));

        /*
        if (!editorState.getCurrentContent().getPlainText()) {
            addMessage(idButton, 'warning', 'Заполните текст задания', 3000);
            return
        }
        */

       saveTaskRequest();
        
        const functionRequest = () => {
            return saveTask(state.maket.code, state.idTaskChange, number, taskTextValueHTML, state.taskChangeFiles)
        };

        const exceptionHandlingFunction = (err) => {
             saveTaskFailure(err)
        }

        const responseHandlingFunction = (json) => {
            if (!json.error) {
                saveTaskSuccess(json.responseMaket.maket);
            } else {
                saveTaskFailure(json.error, json.responseMaket.maket)
            }
        };

        executorRequests(functionRequest, responseHandlingFunction, exceptionHandlingFunction, dispatchRedux);

    };

    return (
        <MaketCardContext.Provider value={{
            maket: state.maket,
            message: state.message,
            idTaskChange: state.idTaskChange,
            taskChangeFiles: state.taskChangeFiles,
            taskEditingOpens: state.taskEditingOpens,
            indexСurrentTab: state.indexСurrentTab,
            editorState: state.editorState,
            openCard,
            openChangeTask,
            switchTab,
            removeTaskFile,
            addTaskFile,
            editingHtmlText,
            handleSaveTask,
            cancelTaskEditing

        }}>{children}</MaketCardContext.Provider>)

}