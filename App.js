import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LanguagePage from './src/component/Auth/LanguagePage';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { PersistGate } from 'redux-persist/integration/react';

import { AppLoading } from 'expo';
import { Provider } from 'react-redux'
import { store, persistedStore } from './src/store/index.js';
import './ReactotronConfig';
import AccessRoots from './src/routes/index'
import { Root } from 'native-base';





export default function App() {
  const [isLoading, setisLoading] = useState(true);







  useEffect(() => {


    async function loadFont() {
      await Font.loadAsync({
        FairuzBlack: require('./assets/fonts/ArbFONTS-Fairuz-Black.otf'),
        FairuzBold: require('./assets/fonts/ArbFONTS-Fairuz-Bold.otf'),
        FairuzLight: require('./assets/fonts/ArbFONTS-Fairuz-Light.otf'),
        FairuzNormal: require('./assets/fonts/ArbFONTS-Fairuz-Normal.otf'),

        ...Ionicons.font,
      });
      setisLoading(false)

    }

    loadFont();



  }, [])

  if (isLoading) {

    return <AppLoading />
  }

  else {
    return (
      <Root>
        <Provider store={store}>
          <PersistGate persistor={persistedStore}>
            <AccessRoots />
            <StatusBar style="auto" />
          </PersistGate>
        </Provider>
      </Root>

    );
  }
}

