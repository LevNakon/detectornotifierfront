export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAIL = 'SIGN_UP_FAIL';
export const SIGN_UP_WATCHER = 'SIGN_UP_WATCHER';
export const SIGN_UP_NULL = 'SIGN_UP_NULL';

export function signUpSuccess(payload){
    return { 
        type: SIGN_UP_SUCCESS,
        message: payload.message,
        success: payload.success
    };
};

export function signUpFail(payload){
    return { 
        type: SIGN_UP_FAIL,
        message: payload.message,
        success: payload.success
    };
};

export function signUpNull(){
    return { 
        type: SIGN_UP_NULL,
        message: '',
        success: null
    };
};

export function signUpWatcher(payload){
    return {
        type: SIGN_UP_WATCHER,
        payload
    }
};