import { CHANGE_MAKETS_STATUS, MAKETS_SGRID_PAGE_CHANGE_PARAMS, MAKETS_FILTER_CHANGE, MAKETS_SORT_CHANGE} from '../types'

const  initialState = {
    status:  'harmonization',
    page: 0,
    pageSize:10,
    filterModel:null,
    sortModel:null
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
                return {
                    ...state,
                    page:0,
                    filterModel: action.payload
                };
            case MAKETS_SORT_CHANGE:
                    return {
                        ...state,
                        page:0,
                        sortModel: action.payload
                    };     
        
        default:

            return state
    }
}