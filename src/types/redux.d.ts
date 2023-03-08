import {store} from '@redux/storage';

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export interface ThunkAPI<E = any> {
  state?: RootState;
  dispatch?: AppDispatch;
  extra?: unknown;
  rejectValue?: E;
  serializedErrorType?: unknown;
  pendingMeta?: unknown;
  fulfilledMeta?: unknown;
  rejectedMeta?: unknown;
}
