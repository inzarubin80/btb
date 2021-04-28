import { LOGIN_SUCCESS, LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_LOGOUT} from '../types'

const  initialState = {

    
    isLoggedIn:  localStorage.getItem('token') ? true : false ,
    loggingIn:  false,
    err:'',
    keyAuthorizationRequest:'',
    
    openInputConfirmationСode:false,
    confirmationСodeSent:false,
    confirmationСodeRequested:false,
    confirmationСodeErr:''

};

export default (state = initialState, action) => {

    switch (action.type) {
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