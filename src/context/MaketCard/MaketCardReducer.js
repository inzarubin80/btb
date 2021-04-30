import {
    OPEN_CARD_MAKET_REQUEST,
    OPEN_CARD_MAKET_FAILURE,
    OPEN_CARD_MAKET_SUCCESS,
    OPEN_EDIT_TASK_REQUEST,
    OPEN_EDIT_TASK_FAILURE,
    OPEN_EDIT_TASK_SUCCESS,
    SWITCH_TAB,
    REMOVE_TASK_FILE,
    ADD_TASK_FILE,
    EDITING_HTML_TEXT,

} from "../types"

export const MaketCardReducer = (state, action) => {


    console.log('MaketCardReducer', action);

    switch (action.type) {

        case EDITING_HTML_TEXT:
            return {
                ...state,
                editorState:action.payload,
            }

        case OPEN_EDIT_TASK_REQUEST:
            return {
                ...state,
                idTaskChange: null,
                taskChangeFiles: [],
                taskEditingOpens: true
            }

        case OPEN_EDIT_TASK_FAILURE:
            return {
                ...state,
                taskEditingOpens: false,
                ...action.payload
            }

        case OPEN_EDIT_TASK_SUCCESS:
            return {
                ...state,
                ...action.payload,
                taskEditingOpens: false
            }

        case OPEN_CARD_MAKET_REQUEST:
            return {
                ...state,
                cardOpens: true,
                maket:null             
            }

        case OPEN_CARD_MAKET_FAILURE:
            return {
                ...state,
                cardOpens: false,
                ...action.payload
            }

        case OPEN_CARD_MAKET_SUCCESS:
            return {
                ...state,
                ...action.payload,
                cardOpens: false
            }

        case REMOVE_TASK_FILE:
                return {
                    ...state,
                    taskChangeFiles: state.taskChangeFiles.filter((file)=>file.uid!=action.payload),
                    cardOpens: false
                }

        case ADD_TASK_FILE:
                    return {
                        ...state,
                        taskChangeFiles: [...state.taskChangeFiles, action.payload],
                        cardOpens: false
                    }
            
            case SWITCH_TAB:
            return {
                ...state,
                ...action.payload,
            }


        default:
            return state
    }

}