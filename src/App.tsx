import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {TailwindProvider} from 'tailwind-rn';
import {Provider} from 'react-redux';

import {RootNavigator} from '@navigators/RootNavigator';
import utilities from '../tailwind.json';
import {store} from '@redux/storage';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <TailwindProvider utilities={utilities}>
        <SafeAreaProvider>
          <RootNavigator />
        </SafeAreaProvider>
      </TailwindProvider>
    </Provider>
  );
};

export default App;
