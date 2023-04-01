export type RouterPathKey =
  | 'LOGIN'
  | 'MAIN_TAB'
  | 'STATISTIC'
  | 'ROOM'
  | 'SERVICE'
  | 'ELECTRICITY'
  | 'WATER'
  | 'NOTIFICATION'
  | 'CONTRACT'
  | 'INVOICE'
  | 'OTHER';

export type RouterPathValue =
  | 'Login'
  | 'MainTab'
  | 'Statistic'
  | 'Room'
  | 'Service'
  | 'Electricity'
  | 'Water'
  | 'Notification'
  | 'Contract'
  | 'Invoice'
  | 'Other';

export type RouterPath = {[key in RouterPathKey]: RouterPathValue};

export type RouterParamsBase = {[key in RouterPathValue]: undefined};

export type RouterParams = RouterParamsBase & {
  REGISTER: {
    path: RouterPathValue;
    params: {};
  };
};
