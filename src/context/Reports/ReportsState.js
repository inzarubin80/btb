import React, { useReducer } from 'react'
import {

    REPORTS_REQUEST,
    REPORTS_SUCCESS,
    REPORTS_FAILURE,
    CLEAR_MESSAGE,
    OPEN_FOLDER_REPORT

} from '../types'
import { ReportsContext } from './ReportsContext'
import { ReportsReducer } from './ReportsReducer'
import { createMesage, alertTypes } from '../../utils/utils';
import { executorRequests, getListReports } from '../../api/dataService1c';
import { useDispatch} from 'react-redux';

export const ReportsState = ({ children }) => {
    const initialState = {
        message: null,
        reportsListRequest: false,
        listReports: [],
        reportGroups: [],
        openFoldersReport:[]
    }

    const constStandartLifetime = 3500;

    const dispatchRedux = useDispatch();
    const [state, dispatch] = useReducer(ReportsReducer, initialState)


    const hendleOpenFolderReports = (id) => {
        dispatch({ type: OPEN_FOLDER_REPORT, payload: {id}})
    }


    const clearMessage = (uid) => {
        dispatch({ type: CLEAR_MESSAGE, payload: { uid } })
    }

    const reportsRequest = () => {
        dispatch({ type: REPORTS_REQUEST })
    }

    const reportsSuccess = (listReports, reportGroups) => {
        dispatch({ type: REPORTS_SUCCESS, payload: { listReports, reportGroups} })
    }
    const reportsFailure = (err) => {
        dispatch({ type: REPORTS_FAILURE, payload: { message: createMesage(alertTypes.info, err, clearMessage, constStandartLifetime) } })
    }

    const hendleGetReportList = () => {
        reportsRequest();

        const functionRequest = () => {
            return getListReports()
        };

        const responseHandlingFunction = (json) => {
            reportsSuccess(json.listReports, json.reportGroups)
        };

        const exceptionHandlingFunction = (error) => {
            reportsFailure(error);
        }

        executorRequests(functionRequest, responseHandlingFunction, exceptionHandlingFunction, dispatchRedux)

    }
    return (
        <ReportsContext.Provider value={{
            message: state.message,
            reportsListRequest:state.reportsListRequest,
            reportGroups:state.reportGroups,
            listReports:state.listReports,
            openFoldersReport:state.openFoldersReport,

            hendleGetReportList,
            hendleOpenFolderReports
        }}>{children}</ReportsContext.Provider>)

}