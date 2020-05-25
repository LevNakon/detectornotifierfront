export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAIL = 'SIGN_IN_FAIL';
export const SIGN_IN_WATCHER = 'SIGN_IN_WATCHER';
export const SIGN_IN_NULL = 'SIGN_IN_NULL';

export function signInSuccess(payload){
    return { 
        type: SIGN_IN_SUCCESS,
        email: payload.user.email,
        message: payload.message,
        success: payload.success
    };
};

export function signInFail(payload){
    return { 
        type: SIGN_IN_FAIL,
        message: payload.message,
        success: payload.success
    };
};

export function signInNull(){
    return { 
        type: SIGN_IN_NULL,
        message: '',
        success: null
    };
};

export function signInWatcher(payload){
    return {
        type: SIGN_IN_WATCHER,
        payload
    }
};