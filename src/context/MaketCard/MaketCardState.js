import React, { useReducer } from 'react'
import {
    OPEN_EDIT_TASK_REQUEST,
    OPEN_EDIT_TASK_FAILURE,
    OPEN_EDIT_TASK_SUCCESS
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

        editorState: React.useState(EditorState.createEmpty()),
        idTaskChange: null,
        taskChangeFiles: [],
        taskEditingOpens: false

    }

    const [state, dispatch] = useReducer(MaketCardReducer, initialState)

    const requestEditTask = () => {
        dispatch({ type: OPEN_EDIT_TASK_REQUEST })
    };

    const requestEditFailure = (err, maket = null) => {
        if (maket) {
            dispatch({ type: OPEN_EDIT_TASK_FAILURE, payload: { message: err, maket } })
        } else {
            dispatch({ type: OPEN_EDIT_TASK_FAILURE, payload: { message: err} })
        }
    };

    const requestEditSuccess = (maket, idTaskChange, taskChangeFiles, editorState) => {
        dispatch({ type: OPEN_EDIT_TASK_SUCCESS, payload: { maket, idTaskChange, taskChangeFiles, editorState } })
    };

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
            message: state.message,
            idTaskChange: state.idTaskChange,
            taskChangeFiles: state.taskChangeFiles,
            taskEditingOpens: state.taskEditingOpens,
            openChangeTask

        }}>{children}</MaketCardContext.Provider>)

}