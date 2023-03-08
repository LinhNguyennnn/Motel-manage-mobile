import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import {navigate} from '@libs/utils/navigation';
// import {actions} from '@redux/slice';
// import {store} from '@redux/storage';
// import {PATH} from '@configs/path';

export const instance = axios.create({
  baseURL: 'http://localhost:8800/api',
  timeout: 100000,
});

// instance.interceptors.request.use(
//   async config => {
//     const access_token = await AsyncStorage.getItem('access_token');
//     if (access_token) {
//       config.headers.Authorization = `Bearer ${access_token}`;
//     }

//     return config;
//   },
//   error => {
//     Promise.reject(error);
//   },
// );

// instance.interceptors.response.use(
//   response => response,
//   async error => {
//     //TODO handle global api error
//     const originalConfig = error.config;
//     // if (originalConfig.url !== '/api/v1/login' && error.response) {
//     //   if (error.response.status === 401 && !originalConfig._retry) {
//     //     originalConfig._retry = true;
//     //     if (error.response.data.message === 'jwt expired') {
//     //       try {
//     //         const token = await AsyncStorage.getItem('refresh_token');
//     //         const rs = await instance.post('/api/v1/refresh_token', {
//     //           refresh_token: token,
//     //         });
//     //         const {access_token, refresh_token} = rs.data;
//     //         await Promise.all([
//     //           AsyncStorage.setItem('access_token', access_token),
//     //           AsyncStorage.setItem('refresh_token', refresh_token),
//     //         ]);
//     //         return instance(originalConfig);
//     //       } catch (_error) {
//     //         return Promise.reject(_error);
//     //       }
//     //     }

//     //     if (error.response.data.message === 'meikantoku jwt expired') {
//     store.dispatch(actions.logout());
//     navigate(PATH.LOGIN);
//     //     }
//     //   }
//     // }

//     return Promise.reject(error);
//   },
// );
