import { UserDto } from '@/application/dtos/core/users/UserDto';
import { UserType } from '@/application/enums/core/users/UserType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccountState } from '../types';

const initialState: AccountState = {
  user: null,
};

export const authSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    hydrate: (state, action) => {
      return action.payload;
    },
    resetAccountState: (state) => {
      state.user = initialState.user;
    },
    setLogged: (state, { payload }: PayloadAction<UserDto>) => {
      state.user = payload;
    },
    setAvatar: (state, { payload }: PayloadAction<string>) => {
      if (state.user) {
        state.user.avatar = payload;
      }
    },
    setRole: (state, { payload }: PayloadAction<UserType>) => {
      if (state.user) {
        state.user.role = payload;
      }
    },
  },
});

export const { resetAccountState, setLogged, setAvatar, setRole, hydrate } = authSlice.actions;

export default authSlice.reducer;
