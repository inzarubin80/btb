import {
    MAKET_PROJECTS_REQUEST,
    MAKET_PROJECTS_FAILURE,
    MAKET_PROJECTS_SUCCESS,
    CLEAR_MESSAGE,
    SET_PROJECT_ID,
    GET_PROJECT_REQUEST,
    GET_PROJECT_FAILURE,
    GET_PROJECT_SUCCESS,
    CHANGE_PROJECT_FIELD,

    NEXT_STAGE_REQUEST,
    NEXT_STAGE_FAILURE,
    NEXT_STAGE_SUCCESS




} from "../types"

export const MaketProjectReducer = (state, action) => {


    console.log(action);

    switch (action.type) {

        case NEXT_STAGE_REQUEST:
            return {
                ...state,
                stageRequest: true,
            }

        case NEXT_STAGE_FAILURE:
            return {
                ...state,
                message: action.payload.message,
                stageRequest: false
            }
        case NEXT_STAGE_SUCCESS:
            return {
                ...state,
                stageRequest: false,
                filds: action.payload.filds

            }
        case CHANGE_PROJECT_FIELD:

            return {

                ...state,
                objectImage: { ...state.objectImage, [action.payload.fildId]: action.payload.fildValue }

            }


        case GET_PROJECT_REQUEST:

            return {

                ...state,
                message: null,
                stagesProject: [],
                projectRequest: true,
                filds: [],
                objectImage: {}

            }

        case GET_PROJECT_FAILURE:

            return {

                ...state,
                message: action.payload.message,
                projectRequest: false,

            }

        case GET_PROJECT_SUCCESS:

            return {

                ...state,
                projectRequest: false,
                stagesProject: action.payload.stagesProject,
                filds: action.payload.filds,
                objectImage: action.payload.objectImage,

            }


        case SET_PROJECT_ID:

            return {

                ...state,
                projectId: action.payload.projectId,

            }

        case MAKET_PROJECTS_REQUEST:

            return {

                ...state,
                message: null,
                projects: [],
                filds: [],
                objectImage: {},
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