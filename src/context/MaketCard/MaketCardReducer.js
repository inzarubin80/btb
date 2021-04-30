import {
    REQUEST_EDIT_FAILURE,
    REQUEST_EDIT_TASK
} from "../types"

export const MaketCardReducer = (state, action) => {

    switch (action.type) {

        case REQUEST_EDIT_TASK:
            return {
                ...state,
                idTaskChange: null,
                taskChangeFiles: [],
                taskEditingOpens: true
            }

        case REQUEST_EDIT_FAILURE:
            return {
                ...state,
                taskEditingOpens: false,
                ...action.payload
            }

        case REQUEST_EDIT_SUCCESS:
                return {
                    ...state,
                    ...action.payload,
                    taskEditingOpens: false
                }
    
        default:
            return state
    }

}