import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosRequestConfig} from 'axios';

import {instance} from '@libs/utils/axios';
import {
  CreatePaymentRequest,
  CreatePaymentResponse,
  GetBillRoomIDRequest,
  GetBillRoomIDResponse,
  GetDetailBillServiceRequest,
  GetDetailBillServiceResponse,
  GetListReportRequest,
  GetListReportResponse,
  GetListServiceRequest,
  GetListServiceResponse,
  GetRoomDataRequest,
  GetRoomDataResponse,
  ThunkAPI,
} from '@types';

export const getDetailBillServiceByMonthYear = createAsyncThunk<
  GetDetailBillServiceResponse,
  GetDetailBillServiceRequest,
  ThunkAPI
>(
  'app/thunk/getDetailBillServiceByMonthYear',
  async (req, {rejectWithValue}) => {
    try {
      const request: AxiosRequestConfig = {
        url: `/statistical/get-detail-bill-service/${req.room_id}/${req.building_name}/${req.month}/${req.year}`,
        method: 'GET',
      };

      const {data} = await instance(request);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getRoomData = createAsyncThunk<
  GetRoomDataResponse,
  GetRoomDataRequest,
  ThunkAPI
>('app/thunk/getRoomData', async (req, {rejectWithValue}) => {
  try {
    const request: AxiosRequestConfig = {
      url: `/room/${req.room_id}`,
      method: 'GET',
    };

    const {data} = await instance(request);

    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getBillRoomID = createAsyncThunk<
  GetBillRoomIDResponse,
  GetBillRoomIDRequest,
  ThunkAPI
>('app/thunk/getBillRoomID', async (req, {rejectWithValue}) => {
  try {
    const request: AxiosRequestConfig = {
      url: `/bill-room/${req.room_id}/${req.year}/${req.month}`,
      method: 'GET',
    };

    const {data} = await instance(request);

    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const createPayment = createAsyncThunk<
  CreatePaymentResponse,
  CreatePaymentRequest,
  ThunkAPI
>('app/thunk/createPayment', async (req, {rejectWithValue}) => {
  try {
    const request: AxiosRequestConfig = {
      url: `/payment/create-payment/${req.building_id}`,
      method: 'POST',
      data: req.data,
    };

    const {data} = await instance(request);

    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getRoomByID = createAsyncThunk<
  GetRoomDataResponse,
  GetRoomDataRequest,
  ThunkAPI
>('app/thunk/getRoomByID', async (req, {rejectWithValue}) => {
  try {
    const request: AxiosRequestConfig = {
      url: `/room/get-data/${req.room_id}`,
      method: 'GET',
    };

    const {data} = await instance(request);

    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getListService = createAsyncThunk<
  GetListServiceResponse,
  GetListServiceRequest,
  ThunkAPI
>('app/thunk/getListService', async (req, {rejectWithValue}) => {
  try {
    const request: AxiosRequestConfig = {
      url: `/service-house/${req.building_id}`,
      method: 'GET',
    };

    const {data} = await instance(request);

    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getListReport = createAsyncThunk<
  GetListReportResponse,
  GetListReportRequest,
  ThunkAPI
>('app/thunk/getListReport', async (req, {rejectWithValue}) => {
  try {
    const request: AxiosRequestConfig = {
      url: `/report/list-room/${req.building_id}`,
      method: 'GET',
    };

    const {data} = await instance(request);

    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
