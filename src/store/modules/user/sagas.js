import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import axios from '../../../services/axios';
import history from '../../../services/history';

import { loginFailure } from '../auth/slice';
import { updateUserData, updateToken } from '../shared/actions';

import {
  editPasswordRequest,
  editPasswordSuccess,
  editUserRequest,
  editUserSuccess,
} from './slice';

function* editUser(action) {
  try {
    const { name, email } = action.payload;

    const response = yield call(axios.put, '/users/', {
      nome: name,
      email: email,
    });

    const { token, ...userData } = response.data;

    yield put(updateUserData(userData));

    if (token) {
      yield put(updateToken(token));
    }

    yield put(editUserSuccess());
    toast.success('Profile updated successfully!');
    history.push('/');
  } catch (e) {
    const errors = get(e, 'response.data.errors', []);
    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
    } else {
      toast.error('Error');
    }

    yield put(loginFailure());
  }
}

function* editPassword(action) {
  try {
    const { currentPassword, newPassword } = action.payload;

    const response = yield call(axios.put, '/users/changePassword/', {
      current_password: currentPassword,
      new_password: newPassword,
    });

    if (response.data.token) {
      yield put(updateToken(response.data.token));
    }

    yield put(editPasswordSuccess());
    toast.success('Password changed successfully!');
    history.push('/');
  } catch (e) {
    const errors = get(e, 'response.data.errors', []);
    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
    } else {
      toast.error('Error');
    }

    yield put(loginFailure());
  }
}

export default all([
  takeLatest(editPasswordRequest.type, editPassword),
  takeLatest(editUserRequest.type, editUser),
]);
