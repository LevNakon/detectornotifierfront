import { all } from 'redux-saga/effects';

import { signInWatcher } from './signInSaga';
import { signUpWatcher } from './signUpSaga';

export default function* rootSaga() {
    yield all([
        signInWatcher(),
        signUpWatcher(),
    ]);
};