import { call, put, takeLatest } from 'redux-saga/effects';

import API from '../api';
import PATHS from '../constants/PATHS';
import { signUpSuccess, signUpFail, SIGN_UP_WATCHER } from '../actions/signUpAction';

function* signUp(action) {
    const {
        firstName,
        lastName,
        email,
        password,
        history
    } = action.payload;
    try {
        let { data } = yield call(API.signUp, {
            firstName,
            lastName,
            email,
            password
        });
        yield put(signUpSuccess(data));
        history.push(PATHS.INDEX);
    } catch (error) {
        const { data } = error.response;
        yield put(signUpFail(data));
    }
};

export function* signUpWatcher() {
    yield takeLatest(SIGN_UP_WATCHER, signUp);
};