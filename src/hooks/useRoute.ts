import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {appSelector} from '@redux/selector';
import {RouterPathValue} from '@types';
import {PATH} from '@configs/path';

type RouteResponse = {
  initialRoute: {
    stackName: RouterPathValue;
    routeName: RouterPathValue;
  };
  loading: boolean;
};

export const useRoute = (): RouteResponse => {
  const {isAuth, loading} = useSelector(appSelector);

  const initialRoute = useMemo(() => {
    if (isAuth) {
      return {stackName: PATH.MAIN_TAB, routeName: PATH.STATISTIC};
    }
    return {stackName: PATH.LOGIN, routeName: PATH.LOGIN};
  }, [isAuth]);

  return {initialRoute, loading};
};
