import {
    MAKET_PROJECTS_REQUEST,
    MAKET_PROJECTS_FAILURE,
    MAKET_PROJECTS_SUCCESS,
    CLEAR_MESSAGE
} from "../types"

export const MaketProjectReducer = (state, action) => {


    console.log(action);

    switch (action.type) {


        case MAKET_PROJECTS_REQUEST:

            return {

                ...state,
                message: null,
                projects: [],
                projectsRequest: true,

            }

        case MAKET_PROJECTS_FAILURE:

            return {

                ...state,
                message: action.payload.message,
                projectsRequest: false,

            }

        case MAKET_PROJECTS_SUCCESS:

            return {

                ...state,
                projectsRequest: false,
                projects: action.payload.projects

            }

        case CLEAR_MESSAGE:

            if (state.message && state.message.uid == action.payload.uid)
                return {

                    ...state,
                    message: null
                }
            else {
                return state;
            }

        default:
            return state
    }

}