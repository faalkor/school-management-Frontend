import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { exampleFailure, exampleSuccess, exampleRequesting } from './slice';

const request = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 600);
  });

function* exampleRequest() {
  try {
    yield call(request);
    yield put(exampleSuccess());
  } catch {
    toast.error('Failure in request');
    yield put(exampleFailure());
  }
}

export default all([takeLatest(exampleRequesting.type, exampleRequest)]);
