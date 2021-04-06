import { CHANGE_MAKETS_STATUS, MAKETS_SGRID_PAGE_CHANGE_PARAMS, MAKETS_FILTER_CHANGE, MAKETS_SORT_CHANGE, MAKETS_SUCCESS } from '../types'

const initialState = {
    status: '',
    page: 0,
    pageSize: 10,
    filterModel: null,
    sortModel: null,
    makets: []
};

export default (state = initialState, action) => {

    switch (action.type) {
        case CHANGE_MAKETS_STATUS:
            return {
                ...state,
                status: action.payload,

            };

        case MAKETS_SGRID_PAGE_CHANGE_PARAMS:
            return {
                ...state,
                ...action.payload

            };
        case MAKETS_FILTER_CHANGE:

            if  (JSON.stringify(state.filterModel) === JSON.stringify(action.payload)) {
                return state;

            } else {
                return {
                    ...state,
                    page: 0,
                    filterModel: action.payload
                };
            }

        case MAKETS_SORT_CHANGE:

            if  (JSON.stringify(state.sortModel) === JSON.stringify(action.payload)) {
                return state;
            }
            else {
                return {
                    ...state,
                    page: 0,
                    sortModel: action.payload
                };

            }


        case MAKETS_SUCCESS:
            return {
                ...state,
                makets: action.payload.makets,
                status: action.payload.status
            };

        default:

            return state
    }
}