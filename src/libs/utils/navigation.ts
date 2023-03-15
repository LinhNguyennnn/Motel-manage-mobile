import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export const navigate = (routePath: string, params?: object): void => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.navigate(routePath, params));
  }
};

export const reset = (routePath: string, params?: object): void => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: routePath, params}],
      }),
    );
  }
};
