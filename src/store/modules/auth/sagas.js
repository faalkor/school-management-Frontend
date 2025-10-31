import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import axios from '../../../services/axios';
import history from '../../../services/history';

import { loginFailure, loginSuccess, loginRequest, logout } from './slice';
import { updateToken } from '../shared/actions';

function* login(action) {
  try {
    const { email, password } = action.payload;

    const response = yield call(axios.post, '/tokens', { email, password });

    yield put(loginSuccess({ ...response.data }));

    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    toast.success('Welcome!');
    history.push('/');
  } catch (error) {
    toast.error('Invalid email or password');

    yield put(loginFailure());
  }
}

function handleLogout() {
  try {
    delete axios.defaults.headers.Authorization;

    toast.info('See you soon!');
    history.push('/');
  } catch (error) {
    toast.error('Error during logout');
  }
}

function rehydrate({ payload }) {
  const token = get(payload, 'auth.token', '');
  if (!token) return;

  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

function handleTokenUpdate(action) {
  try {
    const newToken = action.payload;

    if (newToken) {
      axios.defaults.headers.Authorization = `Bearer ${newToken}`;
    }
  } catch (error) {
    toast.error('Error updating token');
  }
}

export default all([
  takeLatest(loginRequest.type, login),
  takeLatest(logout.type, handleLogout),
  takeLatest('persist/REHYDRATE', rehydrate),
  takeLatest(updateToken.type, handleTokenUpdate),
]);
