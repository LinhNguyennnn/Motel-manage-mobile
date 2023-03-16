import {createSlice} from '@reduxjs/toolkit';

import {
  GetBillRoomIDResponse,
  GetListReportResponse,
  GetListServiceByHouseResponse,
  GetRoomDataResponse,
} from '@types';
import {
  getBillRoomID,
  getListService,
  getListReport,
  getRoomBySubname,
  getBillServiceByYear,
  getDetailBillServiceByMonthYear,
  removeNotification,
  createNotification,
} from './thunk';

type InitialState = {
  isAuth: boolean;
  loading: boolean;
  room_data?: GetRoomDataResponse;
  service?: GetListServiceByHouseResponse;
  bill_data?: GetBillRoomIDResponse;
  notifications?: GetListReportResponse;
  data_by_month: {
    water: {inputValue: number; outputValue: number};
    electric: {inputValue: number; outputValue: number};
  };
  data_by_year: {
    water: {result: number[]; sum: number};
    electric: {result: number[]; sum: number};
  };
};

const initialState: InitialState = {
  isAuth: false,
  loading: false,
  data_by_year: {
    water: {result: [], sum: 0},
    electric: {result: [], sum: 0},
  },
  data_by_month: {
    water: {
      inputValue: 0,
      outputValue: 0,
    },
    electric: {
      inputValue: 0,
      outputValue: 0,
    },
  },
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    logout: state => {
      state.isAuth = false;
      state.loading = false;
      state.room_data = undefined;
      state.service = undefined;
      state.bill_data = undefined;
      state.notifications = undefined;
      state.data_by_month = {
        water: {
          inputValue: 0,
          outputValue: 0,
        },
        electric: {
          inputValue: 0,
          outputValue: 0,
        },
      };
      state.data_by_year = {
        water: {
          result: [],
          sum: 0,
        },
        electric: {
          result: [],
          sum: 0,
        },
      };
    },
  },
  extraReducers: builder => {
    const startLoading = (state: InitialState) => {
      state.loading = true;
    };
    const stopLoading = (state: InitialState) => {
      state.loading = false;
    };

    builder
      .addCase(getRoomBySubname.pending, startLoading)
      .addCase(getBillServiceByYear.pending, startLoading)
      .addCase(getDetailBillServiceByMonthYear.pending, startLoading)
      .addCase(getListService.pending, startLoading)
      .addCase(getBillRoomID.pending, startLoading)
      .addCase(getListReport.pending, startLoading)
      .addCase(removeNotification.pending, startLoading)
      .addCase(createNotification.pending, startLoading);

    builder
      .addCase(getRoomBySubname.fulfilled, (state, action) => {
        state.room_data = action.payload;
        state.isAuth = true;
        stopLoading(state);
      })
      .addCase(getBillServiceByYear.fulfilled, (state, action) => {
        if (action.payload.type === 'dien') {
          state.data_by_year.electric = action.payload.data;
        } else {
          state.data_by_year.water = action.payload.data;
        }
        stopLoading(state);
      })
      .addCase(getDetailBillServiceByMonthYear.fulfilled, (state, action) => {
        if (action.payload.type === 'dien') {
          state.data_by_month.electric = action.payload.data;
        } else {
          state.data_by_month.water = action.payload.data;
        }
        stopLoading(state);
      })
      .addCase(getListService.fulfilled, (state, action) => {
        state.service = action.payload;
        stopLoading(state);
      })
      .addCase(getBillRoomID.fulfilled, (state, action) => {
        state.bill_data = action.payload;
        stopLoading(state);
      })
      .addCase(getListReport.fulfilled, (state, action) => {
        state.notifications = action.payload;
        stopLoading(state);
      })
      .addCase(removeNotification.fulfilled, stopLoading)
      .addCase(createNotification.fulfilled, stopLoading);

    builder
      .addCase(getRoomBySubname.rejected, state => {
        state.isAuth = false;
        stopLoading(state);
      })
      .addCase(getBillServiceByYear.rejected, stopLoading)
      .addCase(getDetailBillServiceByMonthYear.rejected, stopLoading)
      .addCase(getListService.rejected, stopLoading)
      .addCase(getBillRoomID.rejected, stopLoading)
      .addCase(getListReport.rejected, stopLoading)
      .addCase(removeNotification.rejected, stopLoading)
      .addCase(createNotification.rejected, stopLoading);
  },
});

export const {logout} = appSlice.actions;
export default appSlice.reducer;
