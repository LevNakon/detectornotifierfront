import { combineReducers } from 'redux';
import signInReducer from './signInReducer';
import signUpReducer from './signUpReducer';

export default combineReducers({
    signInState: signInReducer,
    signUpState: signUpReducer,
});