import { CHANGE_MAKETS_STATUS, MAKETS_SGRID_PAGE_CHANGE_PARAMS, MAKETS_FILTER_CHANGE, MAKETS_SORT_CHANGE, MAKETS_SUCCESS, MAKETS_FAILURE } from '../types'

const initialState = {
    status: '',
    page: 0,
    pageSize: 10,
    filterModel: {linkOperator: "and", items:[]},
    sortModel: [],
    makets: []
};

export default (state = initialState, action) => {


    console.log(action,action);


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
           
         case MAKETS_FAILURE:
                return {
                    ...state,
                };
                    


        default:

            return state
    }
}