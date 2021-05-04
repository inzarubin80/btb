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
    CANCEL_TASK_EDITING,
    ADD_TASK,
    REMOVE_TASK_START,
    REMOVE_TASK_CANCEL,
    REMOVE_TASK_REQUEST,
    REMOVE_TASK_FAILURE,
    REMOVE_TASK_SUCCESS,
    DOWNLOAD_FILE_MAKET_REQUEST,
    DOWNLOAD_FILE_MAKET_FAILURE,
    DOWNLOAD_FILE_MAKET_SUCCESS,
    UPLOAD_FILE_MAKET_REQUEST,
    UPLOAD_FILE_MAKET_FAILURE,
    UPLOAD_FILE_MAKET_SUCCESS,
    DOWNLOAD_FILE_TASK_REQUEST,
    DOWNLOAD_FILE_TASK_FAILURE,
    DOWNLOAD_FILE_TASK_SUCCESS,
    OPEN_FOLDER_FILES_TASK,
    SET_MAKET_STATUS_REQUEST,
    SET_MAKET_STATUS_FAILURE,
    SET_MAKET_STATUS_SUCCESS,
    CLEAR_MESSAGE_BY_TIMEOUT
} from '../types'
import { MaketCardContext } from './MaketCardContext'
import { MaketCardReducer } from './MaketCardReducer'
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { executorRequests, getMaket, getImgMaket, saveFileСonfirmation, setMaketStatus, saveTask, getFileTask, removeTask } from '../../api/dataService1c';
import htmlToDraft from 'html-to-draftjs';
import { useDispatch } from 'react-redux';
import draftToHtml from 'draftjs-to-html'
import { b64toBlob, getBase64 } from '../../utils/utils';
import { saveAs } from 'file-saver';
import { v4 as uuidv4 } from 'uuid';

const alertTypes = { error: 'error', warning: 'warning', info: 'info', success: 'success' };



export const MaketCardState = ({ children }) => {

    const initialState = {

        maket: null,
        message: null,


        //card open
        cardOpens: false,

        //task 
        editorState: null,
        idTaskChange: null,
        taskChangeFiles: [],
        taskEditingOpens: false,
        taskSaved: false,
        taskRemove: false,
        idTaskRemove: null,

        //files
        uploadFiles: [],
        downloadFiles: [],
        downloadFilesTask: [],
        openFoldersTask: [],
        //carent tab
        indexСurrentTab: 0,

        //state
        statusBeingSet: false

    }


    const dispatchRedux = useDispatch();
    const [state, dispatch] = useReducer(MaketCardReducer, initialState)


    const createMesage = (type, str, lifetime = 0) => {
        const uid = uuidv4();
        if (lifetime) {
            setTimeout(() => dispatch({ type: CLEAR_MESSAGE_BY_TIMEOUT, payload: { uid } }), lifetime)
        }
        return { type, str, uid }
    }

    const setMaketStatusRequest = () => {
        dispatch({ type: SET_MAKET_STATUS_REQUEST })
    }

    const setMaketStatusFailure = (message, maket = null) => {
        dispatch({ type: SET_MAKET_STATUS_FAILURE, payload: { message: createMesage(alertTypes.info, message, 3000), maket } })
    }

    const setMaketStatusSuccess = (maket) => {
        dispatch({ type: SET_MAKET_STATUS_SUCCESS, payload: { maket } })
    }

    const hendleSetMaketStatus = (uidState) => {
        setMaketStatusRequest();

        const functionRequest = () => {
            return setMaketStatus(state.maket.code, uidState)
        };

        const responseHandlingFunction = (json) => {
            if (!json.error) {
                setMaketStatusSuccess(json.responseMaket.maket);

            } else {

                setMaketStatusFailure(json.error, json.responseMaket.maket);
            }
        };

        const exceptionHandlingFunction = (error) => {
            setMaketStatusFailure(error);
        }

        executorRequests(functionRequest, responseHandlingFunction, exceptionHandlingFunction, dispatchRedux);


    }


    const hendleOpenFolderFilesTask = (idTask) => {
        dispatch({ type: OPEN_FOLDER_FILES_TASK, payload: { idTask } })
    }

    const downloadFileTaskRequest = (idFile) => {
        dispatch({ type: DOWNLOAD_FILE_TASK_REQUEST, payload: { idFile } })
    }

    const downloadFileTaskFailure = (idFile, message) => {
        dispatch({ type: DOWNLOAD_FILE_TASK_FAILURE, payload: { idFile, message: createMesage(alertTypes.info, message, 3000) } })
    }

    const downloadFileTaskSuccess = (idFile) => {
        dispatch({ type: DOWNLOAD_FILE_TASK_SUCCESS, payload: { idFile } })
    }


    const handleDownloadFileTask = (uidTask, idFile) => {

        downloadFileTaskRequest(idFile);

        const functionRequest = () => {
            return getFileTask(state.maket.code, uidTask, idFile)
        };

        const responseHandlingFunction = (json) => {
            if (!json.error) {
                const blob = b64toBlob(json.fileBase64, '');
                saveAs(blob, json.name);
                downloadFileTaskSuccess(idFile);
            } else {
                downloadFileTaskFailure(idFile, !json.error);
            }
        };

        const exceptionHandlingFunction = (error) => {
            downloadFileTaskFailure(idFile, error);
        }

        executorRequests(functionRequest, responseHandlingFunction, exceptionHandlingFunction, dispatchRedux);
    }


    const uploadFileMaketRequest = (idFile) => {
        dispatch({ type: UPLOAD_FILE_MAKET_REQUEST, payload: { idFile } })
    }
    const uploadFileMaketFailure = (idFile, message, maket = null) => {
        dispatch({ type: UPLOAD_FILE_MAKET_FAILURE, payload: { idFile, message: createMesage(alertTypes.info, message, 3000), maket } })
    }
    const uploadFileMaketSuccess = (idFile, maket) => {
        dispatch({ type: UPLOAD_FILE_MAKET_SUCCESS, payload: { idFile, maket } })
    }


    const handleUploadFile = (idFile, macetCode, file, fileName, shortfileName) => {

        uploadFileMaketRequest(idFile);

        getBase64(file).then(fileBase64 => {

            const functionRequest = () => {
                return saveFileСonfirmation(macetCode, fileName, shortfileName, fileBase64)
            };

            const responseHandlingFunction = (json) => {
                if (!json.error) {
                    uploadFileMaketSuccess(idFile, json.responseMaket.maket)
                } else {
                    uploadFileMaketFailure(idFile, json.error, json.responseMaket.maket)
                }
            }

            const exceptionHandlingFunction = (err) => {

                uploadFileMaketFailure(idFile, err);

            };

            executorRequests(functionRequest, responseHandlingFunction, exceptionHandlingFunction, dispatchRedux);

        }
        )
            .catch(err => {
                uploadFileMaketRequest(idFile, err);;
            });
    }

    const downloadFileMaketRequest = (idFile) => {
        dispatch({ type: DOWNLOAD_FILE_MAKET_REQUEST, payload: { idFile } })
    }
    const downloadFileMaketFailure = (idFile, message) => {
        dispatch({ type: DOWNLOAD_FILE_MAKET_FAILURE, payload: { idFile, message: createMesage(alertTypes.info, message, 3000) } })
    }
    const downloadFileMaketSuccess = (idFile) => {
        dispatch({ type: DOWNLOAD_FILE_MAKET_SUCCESS, payload: { idFile } })
    }


    const handleDownload = (id, code, fileName) => {


        downloadFileMaketRequest(id)

        const functionRequest = () => {
            return getImgMaket(code, fileName)
        };
        const responseHandlingFunction = (json) => {

            if (!json.error) {
                const blob = b64toBlob(json.file.imgBase64, '');
                downloadFileMaketSuccess(id);
                saveAs(blob, json.file.shortName);
            }
            else {
                downloadFileMaketFailure(id, json.error)
            }
        }

        const exceptionHandlingFunction = (err) => {
            downloadFileMaketFailure(id, err)
        };

        executorRequests(functionRequest, responseHandlingFunction, exceptionHandlingFunction, dispatchRedux);
    }



    const removeTaskRequest = () => {
        dispatch({ type: REMOVE_TASK_REQUEST })
    }

    const removeTaskFailure = (err, maket = null) => {
        if (maket) {
            dispatch({ type: REMOVE_TASK_FAILURE, payload: { message: createMesage(alertTypes.info, err, 3000), maket } })

        } else {
            dispatch({ type: REMOVE_TASK_FAILURE, payload: { message: createMesage(alertTypes.info, err, 3000) } })
        }
    }

    const removeTaskSuccess = (maket) => {
        dispatch({ type: REMOVE_TASK_SUCCESS, payload: { maket } })
    }

    const hendleRemoveTask = () => {

        removeTaskRequest();

        const functionRequest = () => {
            return removeTask(state.maket.code, state.idTaskRemove)
        };

        const responseHandlingFunction = (json) => {
            if (!json.error) {
                removeTaskSuccess(json.maket);
            } else {
                removeTaskFailure(json.error, json.responseMaket.maket)
            }
        }

        const exceptionHandlingFunction = (err) => {
            removeTaskFailure(err)
        }

        executorRequests(functionRequest, responseHandlingFunction, exceptionHandlingFunction, dispatchRedux);
    }



    const removeTaskCancel = () => {
        dispatch({ type: REMOVE_TASK_CANCEL })
    }

    const removeTaskStart = (idTaskRemove) => {
        dispatch({ type: REMOVE_TASK_START, payload: { idTaskRemove } })
    }



    const editingHtmlText = (newEditorState) => {
        dispatch({ type: EDITING_HTML_TEXT, payload: newEditorState })
    }

    const switchTab = (indexСurrentTab) => {
        dispatch({ type: SWITCH_TAB, payload: { indexСurrentTab } })
    }

    const requestEditTask = () => {
        dispatch({ type: OPEN_EDIT_TASK_REQUEST })
    };

    const addTask = () => {
        dispatch({ type: ADD_TASK })
    }

    const requestEditFailure = (err, maket = null) => {
        if (maket) {
            dispatch({ type: OPEN_EDIT_TASK_FAILURE, payload: { message: createMesage(alertTypes.info, err, 3000), maket } })
        } else {
            dispatch({ type: OPEN_EDIT_TASK_FAILURE, payload: { message: createMesage(alertTypes.info, err, 3000) } })
        }
    };

    const requestEditSuccess = (maket, idTaskChange, taskChangeFiles, editorState) => {
        dispatch({ type: OPEN_EDIT_TASK_SUCCESS, payload: { maket, idTaskChange, taskChangeFiles, editorState } })
    };

    const openCardMaketRequest = () => {
        dispatch({ type: OPEN_CARD_MAKET_REQUEST, payload: { ...initialState, cardOpens: true } })
    }
    const openCardMaketFailure = (message) => {
        dispatch({ type: OPEN_CARD_MAKET_FAILURE, payload: { message: createMesage(alertTypes.info, message, 3000) } })
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

        const exceptionHandlingFunction = (err) => { openCardMaketFailure(err) }

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

        const exceptionHandlingFunction = (err) => { requestEditFailure(err) }
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
    const saveTaskFailure = (err, maket = null) => {
        if (maket) {
            dispatch({ type: SAVE_TASK_FAILURE, payload: { message: createMesage(alertTypes.info, err, 3000), maket } })
        } else {
            dispatch({ type: SAVE_TASK_FAILURE, payload: { message: createMesage(alertTypes.info, err, 3000) } })
        }

    }
    const saveTaskSuccess = (maket) => {
        dispatch({ type: SAVE_TASK_SUCCESS, payload: { maket } })
    }


    const cancelTaskEditing = () => {
        dispatch({ type: CANCEL_TASK_EDITING })
    }



    const handleSaveTask = () => {


        let number = 0;
        if (state.idTaskChange != '-1') {
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
            idTaskRemove: state.idTaskRemove,
            downloadFiles: state.downloadFiles,
            uploadFiles: state.uploadFiles,
            downloadFilesTask: state.downloadFilesTask,
            openFoldersTask: state.openFoldersTask,
            statusBeingSet: state.statusBeingSet,
            openCard,
            openChangeTask,
            switchTab,
            removeTaskFile,
            addTaskFile,
            editingHtmlText,
            handleSaveTask,
            cancelTaskEditing,
            addTask,
            removeTaskStart,
            removeTaskCancel,
            hendleRemoveTask,
            handleDownload,
            handleUploadFile,
            handleDownloadFileTask,
            hendleOpenFolderFilesTask,
            hendleSetMaketStatus

        }}>{children}</MaketCardContext.Provider>)

}