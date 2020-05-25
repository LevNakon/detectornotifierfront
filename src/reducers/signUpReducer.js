import { SIGN_UP_SUCCESS, SIGN_UP_FAIL, SIGN_UP_NULL } from '../actions/signUpAction';

const initialState = { message: '', success: null };

export default (state = initialState, action) => {
    switch (action.type) {
        case SIGN_UP_SUCCESS:
            return {
                ...state,
                message: action.message,
                success: action.success 
            };
        case SIGN_UP_FAIL:
            return {
                ...state,
                message: action.message,
                success: action.success
            };
        case SIGN_UP_NULL:
            return {
                ...state,
                message: action.message,
                success: action.success
            };
        default: return state;
    }
};