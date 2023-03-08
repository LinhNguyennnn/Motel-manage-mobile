import {createSlice} from '@reduxjs/toolkit';

import {getRoomByID} from './thunk';

type InitialState = {
  isAuth: boolean;
  loading: boolean;
  code_room?: {
    _id: string;
    building_id: string;
    name: string;
  };
};

const initialState: InitialState = {
  isAuth: false,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state = initialState;
    },
  },
  extraReducers: builder => {
    builder.addCase(getRoomByID.pending, state => {
      state.loading = true;
    });
    builder.addCase(getRoomByID.fulfilled, (state, action) => {
      state.code_room = {
        _id: action.payload._id,
        building_id: action.payload.idHouse,
        name: action.payload.name,
      };
      state.isAuth = true;
      state.loading = false;
    });
    builder.addCase(getRoomByID.rejected, state => {
      state.loading = false;
    });
  },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;
