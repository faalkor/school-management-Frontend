import { createAction } from '@reduxjs/toolkit';

export const updateUserData = createAction('shared/updateUserData');
export const updateToken = createAction('shared/updateToken');
export const clearAuthData = createAction('shared/clearAuthData');
