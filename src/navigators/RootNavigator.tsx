import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {navigationRef} from '@libs/utils/navigation';
import {useRoute} from '@hooks/useRoute';
import {Routes} from './Routes';

export const RootNavigator: React.FC = () => {
  const {initialRoute} = useRoute();

  return (
    <NavigationContainer ref={navigationRef}>
      <Routes initialRoute={initialRoute} />
    </NavigationContainer>
  );
};
