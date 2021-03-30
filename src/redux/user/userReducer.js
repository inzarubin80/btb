import { LOGIN_SUCCESS, LOGIN_LOGOUT, SET_USERNAME, SET_PASSWORD, SET_ROLES } from '../types'

const  initialState = {
    
    user:  null ,
    username:   '',
    password: '',
    err:'',
    uid:'',
    userRoles: {roles:[], subscriptionRoles:null}

};

let buld;

export default (state = initialState, action) => {

    switch (action.type) {
        
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                uid: action.payload.uid,
                
            };
        
            case SET_ROLES:
                return {
                    ...state,
                    userRoles: action.payload
                    
                };
                

        case LOGIN_LOGOUT:
            return {
                ...state,
                user: null,
                uid:'',
                userRoles: {roles:[], subscriptionRoles:null}
            };

        
        case SET_USERNAME:
            return {
                ...state,       
                username: action.payload,
   
            };

        case SET_PASSWORD:
            return {
                ...state,       
                password: action.payload,
   
            };
         

        default:

            return state
    }
}
