import { createSlice } from '@reduxjs/toolkit';

const exampleSlice = createSlice({
  name: 'example',
  initialState: {
    submitted: false,
    loading: false, // Track loading state
    error: null, // Track errors
  },
  reducers: {
    exampleRequesting: (state) => {
      console.log('exampleRequesting action called');
      state.loading = true;
      state.error = null;
    },
    exampleSuccess: (state) => {
      state.loading = false;
      state.submitted = !state.submitted;
      state.error = null;
    },
    exampleFailure: (state, action) => {
      console.log('error');
      state.loading = false;
      state.error = action.payload; // Store error message
    },
  },
});

export const { exampleRequesting, exampleSuccess, exampleFailure } =
  exampleSlice.actions;
export default exampleSlice.reducer;
