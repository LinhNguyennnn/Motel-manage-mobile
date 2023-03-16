import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosRequestConfig} from 'axios';

import {instance} from '@libs/utils/axios';
import {
  CreateNotificationRequest,
  CreatePaymentRequest,
  CreatePaymentResponse,
  GetBillRoomIDRequest,
  GetBillRoomIDResponse,
  GetDetailBillServiceRequest,
  GetDetailBillServiceResponse,
  GetListReportRequest,
  GetListReportResponse,
  GetListServiceByHouseRequest,
  GetListServiceByHouseResponse,
  GetListServiceRequest,
  GetListServiceResponse,
  GetRoomDataRequest,
  GetRoomDataResponse,
  RemoveNotificationRequest,
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
        url: `/statistical/get-detail-bill-service/${req.room_id}/${req.type}/${req.month}/${req.year}`,
        method: 'GET',
      };

      const {data} = await instance(request);

      return {...data, type: req.type};
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

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

export const getRoomBySubname = createAsyncThunk<
  GetRoomDataResponse,
  GetRoomDataRequest,
  ThunkAPI
>('app/thunk/getRoomBySubname', async (req, {rejectWithValue}) => {
  try {
    const request: AxiosRequestConfig = {
      url: `/room/get-data/${req.subname}`,
      method: 'GET',
    };

    const {data} = await instance(request);

    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getListService = createAsyncThunk<
  GetListServiceByHouseResponse,
  GetListServiceByHouseRequest,
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

export const getBillServiceByYear = createAsyncThunk<
  GetListServiceResponse,
  GetListServiceRequest,
  ThunkAPI
>('app/thunk/getBillServiceByYear', async (req, {rejectWithValue}) => {
  try {
    const request: AxiosRequestConfig = {
      url: `/statistical/get-bill-service/${req.building_id}/${req.type}/${req.year}`,
      method: 'GET',
    };

    const {data} = await instance(request);

    return {...data, type: req.type};
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const removeNotification = createAsyncThunk<
  undefined,
  RemoveNotificationRequest,
  ThunkAPI
>('app/thunk/removeNotification', async (req, {rejectWithValue}) => {
  try {
    const request: AxiosRequestConfig = {
      url: `/report/remove/${req.id}`,
      method: 'DELETE',
    };

    const {data} = await instance(request);

    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const createNotification = createAsyncThunk<
  undefined,
  CreateNotificationRequest,
  ThunkAPI
>('app/thunk/createNotification', async (req, {rejectWithValue}) => {
  try {
    const request: AxiosRequestConfig = {
      url: '/report/create',
      method: 'POST',
      data: req,
    };

    const {data} = await instance(request);

    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
