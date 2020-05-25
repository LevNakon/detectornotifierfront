import { call, put, takeLatest } from 'redux-saga/effects';

import API from '../api';
import auth from '..//utils/auth';
import PATHS from '../constants/PATHS';
import { signInSuccess, signInFail, SIGN_IN_WATCHER } from '../actions/signInAction';

function* signIn(action) {
    const {
        email,
        password,
        history
    } = action.payload;
    try {
        let { data } = yield call(API.signIn, {
            email,
            password
        });
        yield put(signInSuccess(data));
        auth.login(data.user.token, data.user.email);
    } catch (error) {
        const { data } = error.response;
        yield put(signInFail(data));
    }
};

export function* signInWatcher() {
    yield takeLatest(SIGN_IN_WATCHER, signIn);
};