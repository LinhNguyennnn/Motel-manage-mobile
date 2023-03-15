import {createSlice} from '@reduxjs/toolkit';

import {getRoomByID} from './thunk';

type InitialState = {
  isAuth: boolean;
  loading: boolean;
  code_room?: {
    _id: string;
    building_id: string;
    name: string;
    subName: string;
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
      state.isAuth = false;
      state.loading = false;
      state.code_room = undefined;
    },
  },
  extraReducers: builder => {
    builder.addCase(getRoomByID.pending, state => {
      state.loading = true;
    });
    builder.addCase(getRoomByID.fulfilled, (state, action) => {
      state.code_room = {
        _id: action.payload.data._id,
        building_id: action.payload.data.idHouse,
        name: action.payload.data.name,
        subName: action.payload.data.subName,
      };
      state.isAuth = true;
      state.loading = false;
    });
    builder.addCase(getRoomByID.rejected, state => {
      state.isAuth = false;
      state.loading = false;
    });
  },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;
