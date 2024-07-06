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
    setUserToken: (state, action: PayloadAction<{ access_token: string; refresh_token?: string }>) => {
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
    },
    unSetUserToken: (state) => {
      state.access_token = null;
      state.refresh_token = undefined;
    },
  },
});

export const { setUserToken, unSetUserToken } = authSlice.actions;

export default authSlice.reducer;
