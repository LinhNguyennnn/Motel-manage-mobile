import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {navigationRef, reset} from '@libs/utils/navigation';
import {useAppDispatch} from '@hooks/useAppDispatch';
import {getRoomBySubname} from '@redux/thunk';
import {appSelector} from '@redux/selector';
import {useRoute} from '@hooks/useRoute';
import {logout} from '@redux/slice';
import {PATH} from '@configs/path';
import {Routes} from './Routes';

export const RootNavigator: React.FC = () => {
  const {room_data, isAuth} = useSelector(appSelector);

  const {initialRoute} = useRoute();

  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      if (isAuth) {
        if (room_data?.data.subName) {
          const resultAction = await dispatch(
            getRoomBySubname({subname: room_data?.data.subName}),
          );
          if (getRoomBySubname.fulfilled.match(resultAction)) return;
        }
        dispatch(logout());
        reset(PATH.LOGIN);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Routes initialRoute={initialRoute} />
    </NavigationContainer>
  );
};
