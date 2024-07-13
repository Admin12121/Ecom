import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  access_token: string | null;
  refresh_token?: string; // Assuming refresh_token is optional
}

const initialState: AuthState = {
  access_token: null,
};

export const authSlice = createSlice({
  name: 'auth_token',
  initialState,
  reducers: {
    setUserToken: (state, action: PayloadAction<{ access: string; refresh?: string }>) => {
      state.access_token = action.payload.access;
      state.refresh_token = action.payload.refresh;
    },
    unSetUserToken: (state) => {
      state.access_token = null;
      state.refresh_token = undefined;
    },
  },
});

export const { setUserToken, unSetUserToken } = authSlice.actions;

export default authSlice.reducer;
