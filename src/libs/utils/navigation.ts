import {
  CommonActions,
  StackActions,
  createNavigationContainerRef,
} from '@react-navigation/native';

import {RouterPathValue} from '@types';

export const navigationRef = createNavigationContainerRef();

export const navigate = (routePath: RouterPathValue, params?: object): void => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.navigate(routePath, params));
  }
};

export const reset = (routePath: RouterPathValue, params?: object): void => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: routePath, params}],
      }),
    );
  }
};

export const push = (routePath: RouterPathValue, params?: object): void => {
  navigationRef.isReady() &&
    navigationRef.dispatch(StackActions.push(routePath, params));
};
