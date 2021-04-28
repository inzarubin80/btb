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
    confirmationСodeErr: ''
};

export default (state = initialState, action) => {

    switch (action.type) {
      


      case CONFIRMATION_CODE_SUCCESS:
                return {
                    ...state,               
                    confirmationСodeRequested:false,
                    confirmationСodeErr:'',
                    confirmationСodeSent:true,
                    
                };


        case CONFIRMATION_CODE_FAILURE:
            return {
                ...state,               
                confirmationСodeRequested:false,
                confirmationСodeErr:action.payload
            };


        case CONFIRMATION_CODE_REQUEST:
            return {
                ...state,
                ...action.payload,
                confirmationСodeRequested:true,
                loggingIn: false,
                isLoggedIn: false,
                confirmationСodeErr:'',
                confirmationСodeSent:false
            };

            case LOGIN_REQUEST:
                return {
                    ...state,
                    ...action.payload,
                    loggingIn: true,
                    isLoggedIn: false,
    
                };
    
    
            case LOGIN_SUCCESS:
                return {
                    ...state,
                    ...action.payload,
                    loggingIn: false,
                    isLoggedIn: true,
                };
    
        case LOGIN_FAILURE:
            return {
                ...state,

                ...action.payload,

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