import {
    OPEN_EDIT_TASK_REQUEST,
    OPEN_EDIT_TASK_FAILURE,
    OPEN_EDIT_TASK_SUCCESS
} from "../types"

export const MaketCardReducer = (state, action) => {

    switch (action.type) {

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
    
        default:
            return state
    }

}