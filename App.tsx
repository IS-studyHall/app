/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import React from 'react';
import NavigationProvider from './src/components/providers/navigation/flow';

const App = () => {
  return (
    <BottomSheetModalProvider>
      <NavigationProvider />
    </BottomSheetModalProvider>
  );
};
/*
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <NavigationProvider />
    </SafeAreaView>
*/
export default App;
