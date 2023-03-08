export type RouterPathKey =
  | 'LOGIN'
  | 'MAIN_TAB'
  | 'STATISTIC'
  | 'ROOM'
  | 'SERVICE'
  | 'ELECTRICITY'
  | 'WATER'
  | 'REPORT'
  | 'CONTRACT'
  | 'RECEIPT';

export type RouterPathValue =
  | 'Login'
  | 'MainTab'
  | 'Statistic'
  | 'Room'
  | 'Service'
  | 'Electricity'
  | 'Water'
  | 'Report'
  | 'Contract'
  | 'Receipt';

export type RouterPath = {[key in RouterPathKey]: RouterPathValue};

export type RouterParamsBase = {[key in RouterPathValue]: undefined};

export type RouterParams = RouterParamsBase & {
  REGISTER: {
    path: RouterPathValue;
    params: {};
  };
};
