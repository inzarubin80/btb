import {

    REPORTS_REQUEST,
    REPORTS_SUCCESS,
    REPORTS_FAILURE,
    OPEN_FOLDER_REPORT
} from "../types"



export const ReportsReducer = (state, action) => {


    switch (action.type) {


        case REPORTS_REQUEST:
            return {
                ...state,
                message: null,
                listReports: [],
                reportGroups: []
            }

        case REPORTS_SUCCESS:
            return {
                ...state,
                message: null,
                listReports: action.payload.listReports,
                reportGroups: action.payload.reportGroups
            }
        case REPORTS_FAILURE:
            return {
                ...state,
                message: action.payload.message,
            }

        case OPEN_FOLDER_REPORT:

            if (state.openFoldersReport.find(id =>id == action.payload.id)) {
                return {
                    ...state,
                    openFoldersReport: state.openFoldersReport.filter(id=>id!=action.payload.id)
                }
            } else {
                return {
                    ...state,
                    openFoldersReport: [...state.openFoldersReport, action.payload.id]
                }
            }
        default:
            return state
    }

}