import {combineReducers} from 'redux'
import userReducer from './user/userReducer'
import maketsReducer from './makets/maketsReducer'


const rootReducer = combineReducers({user: userReducer, makets: maketsReducer})
export default rootReducer