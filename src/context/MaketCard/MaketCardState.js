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

} from '../types'
import { MaketCardContext } from './MaketCardContext'
import { MaketCardReducer } from './MaketCardReducer'
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { executorRequests, getMaket, getImgMaket, saveFileСonfirmation, revisionMaket, сonfirmationMaket, saveTask, getFileTask, removeTask } from '../../api/dataService1c';
import htmlToDraft from 'html-to-draftjs';
import { useDispatch } from 'react-redux';
import draftToHtml from 'draftjs-to-html'
import { b64toBlob, getBase64 } from '../../utils/utils';
import { saveAs } from 'file-saver';

export const MaketCardState = ({ children }) => {

    const initialState = {

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
        taskRemove: false,
        idTaskRemove: null,

        //files
        uploadFiles: [],
        downloadFiles: [],
        openFiles: [],

        //carent tab
        indexСurrentTab: 0,

    }


    const dispatchRedux = useDispatch();
    const [state, dispatch] = useReducer(MaketCardReducer, initialState)


    const removeTaskRequest = () => {
        dispatch({ type: REMOVE_TASK_REQUEST })
    }
    const removeTaskFailure = (err, maket = null) => {
        if (maket) {
            dispatch({ type: REMOVE_TASK_FAILURE, payload: { message: err, maket } })

        } else {
            dispatch({ type: REMOVE_TASK_FAILURE, payload: { message: err } })
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
    const saveTaskFailure = (err, maket = null) => {
        if (maket) {
            dispatch({ type: SAVE_TASK_FAILURE, payload: { message: err, maket } })
        } else {
            dispatch({ type: SAVE_TASK_FAILURE, payload: { message: err } })
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


    const handleDownload = (code, fileName) => {

        //const idButton = fileName + 'save';
        // hendlerStateLoadingButton(idButton, true);

        const functionRequest = () => {
            return getImgMaket(code, fileName)
        };
        const responseHandlingFunction = (json) => {

            if (!json.error) {
                const blob = b64toBlob(json.file.imgBase64, '');
                saveAs(blob, json.file.shortName);
            }
        }

        const exceptionHandlingFunction = () => {
        };

        executorRequests(functionRequest, responseHandlingFunction, exceptionHandlingFunction, dispatch);
    }


    /*
    const handleDownloadFileTask = (uidTask, uidFile) => {

const idButton = uidFile + 'save';
hendlerStateLoadingButton(idButton, true);
 
const functionRequest = () => {
  return getFileTask(maket.code, uidTask, uidFile)
};
  

 

const responseHandlingFunction = (json) => {
  
  if (!json.error){

 //   console.log("!json.error");

   // const time = performance.now();
    const blob = b64toBlob(json.fileBase64, '');
    //time = performance.now() - time;
   // console.log('Время выполнения b64toBlob = ', time);

  
    saveAs(blob, json.name); 
  }
  
 
    hendlerStateLoadingButton(idButton, false);
  };

const exceptionHandlingFunction = (error) => {

 
  hendlerStateLoadingButton(idButton, false);
}
 executorRequests(functionRequest, responseHandlingFunction, exceptionHandlingFunction, dispatch);
}
   

const hendleRevisionMaket = () => {

  const idButton = 'revisionButton';

  hendlerStateLoadingButton(idButton, true);

  const functionRequest = () => {
    return   revisionMaket(maket.code)
  };

  const responseHandlingFunction = (json)=> {
  
    hendlerStateLoadingButton(idButton, false);

      if (json.responseMaket.maket) {
        //setMaket(json.responseMaket.maket);
      }

      if (json.error) {
        addMessage(idButton,'warning', json.error, 3000);
      } else {
        addMessage(idButton,'success', 'Статус макета успешно изменен', 3000);
      }
  }

  const exceptionHandlingFunction = () => {
    hendlerStateLoadingButton(idButton, false); 
  };

  executorRequests(functionRequest, responseHandlingFunction, exceptionHandlingFunction, dispatch);

}


  const hendleConfirmationMaket = () => {

  const idButton = 'confirmationButton';

  hendlerStateLoadingButton(idButton, true);

  const functionRequest = () => {
    return   сonfirmationMaket(maket.code)
  };

  const responseHandlingFunction = (json)=> {
  
    hendlerStateLoadingButton(idButton, false);

      if (json.responseMaket.maket) {
        //setMaket(json.responseMaket.maket);
      }

      if (json.error) {
        addMessage(idButton,'warning', json.error, 3000);
      } else {
        addMessage(idButton,'success', 'Статус макета успешно изменен', 3000);
      }
  }

  const exceptionHandlingFunction = () => {
    hendlerStateLoadingButton(idButton, false); 
    addMessage(idButton,'warning', "Что то пошло не так...", 3000);
  };

  executorRequests(functionRequest, responseHandlingFunction, exceptionHandlingFunction, dispatch);

}


const handleOpenFile = (macetCode, fileName) => {

const idButton = fileName  + 'open';
hendlerStateLoadingButton(idButton, true);

const  functionRequest = () => {
  return getImgMaket(macetCode, fileName)
}

const responseHandlingFunction = (json) => {
  hendlerStateLoadingButton(idButton, false);
  seIimgData(json.file);
  setIsOpen(true);
}

const exceptionHandlingFunction = () => {
  hendlerStateLoadingButton(idButton, false);
  seIimgData(null);
};
  
executorRequests(functionRequest, responseHandlingFunction, exceptionHandlingFunction, dispatch);

}

const handleChangeFile = (macetCode, file, fileName, shortfileName) => {

  const idButton = fileName + 'upload';

  hendlerStateLoadingButton(idButton, true);

  getBase64(file).then(fileBase64 => {

      const functionRequest = () => {
        return  saveFileСonfirmation(macetCode, fileName, shortfileName, fileBase64)
      };

      const responseHandlingFunction = (json)=> {
        if (json.responseMaket.maket) {
          //setMaket(json.responseMaket.maket);
        }
        hendlerStateLoadingButton(idButton, false);
      }
      
      const exceptionHandlingFunction = () => {
        hendlerStateLoadingButton(idButton, false); 
      };

      executorRequests(functionRequest, responseHandlingFunction, exceptionHandlingFunction, dispatch);

  }
  )
    .catch(err => {
      console.log(err);
    });
}


*/
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
            hendleRemoveTask

        }}>{children}</MaketCardContext.Provider>)

}