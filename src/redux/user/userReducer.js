import { LOGIN_SUCCESS, LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_LOGOUT, CONFIRMATION_CODE_REQUEST, CONFIRMATION_CODE_SUCCESS, CONFIRMATION_CODE_FAILURE} from '../types'


const initialState = {

    isLoggedIn: localStorage.getItem('token') ? true : false,
    userID: localStorage.getItem('userID'),
    typeUserID: localStorage.getItem('typeUserID'),
    loggingIn: false,
    err: '',
    requestKey: '',
    confirmationСodeSent: false,
    confirmationСodeRequested: false,
};

export default (state = initialState, action) => {

    switch (action.type) {
      


      case CONFIRMATION_CODE_SUCCESS:
                return {
                    ...state,               
                    confirmationСodeRequested:false,
                    err:'',
                    confirmationСodeSent:true,
                    
                };


        case CONFIRMATION_CODE_FAILURE:
            return {
                ...state,               
                confirmationСodeRequested:false,
                err:action.payload
            };


        case CONFIRMATION_CODE_REQUEST:
            return {
                ...state,
                ...action.payload,
                confirmationСodeRequested:true,
                loggingIn: false,
                isLoggedIn: false,
                err:'',
                confirmationСodeSent:false
            };

            case LOGIN_REQUEST:
                return {
                    ...state,
                    loggingIn: true,
                    isLoggedIn: false,
    
                };
    
    
            case LOGIN_SUCCESS:
                return {
                    ...state,
                    ...action.payload,
                    loggingIn: false,
                    isLoggedIn: true,
                    confirmationСodeSent:false,
                    requestKey:''
                };
    
        case LOGIN_FAILURE:
            return {
                ...state,

                err:action.payload,

                loggingIn: false,
                isLoggedIn: false,
            };


        case LOGIN_LOGOUT:
            return {
                ...state,
                ...action.payload,
                loggingIn: false,
                isLoggedIn: false,
            };


        default:

            return state
    }
}