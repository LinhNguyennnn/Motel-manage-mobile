import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as PaperProvider} from 'react-native-paper';
import {PersistGate} from 'redux-persist/integration/react';
import {TailwindProvider} from 'tailwind-rn';
import {Provider} from 'react-redux';

import {RootNavigator} from '@navigators/RootNavigator';
import {persistor, store} from '@redux/storage';
import utilities from '../tailwind.json';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <PaperProvider>
          <TailwindProvider utilities={utilities}>
            <SafeAreaProvider>
              <RootNavigator />
            </SafeAreaProvider>
          </TailwindProvider>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
