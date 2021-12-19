import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import myTheme from '../theme';
import Application from '~/modules/Application';
import { persistor, store } from '~/store';

const App = () => {
  return (
    <NativeBaseProvider theme={myTheme}>
      <NavigationContainer>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Application />
          </PersistGate>
        </Provider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
