import * as React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from '../../../../../screens';
import SplashScreen from '../../../../../screens/splash';

const MainStackNavigator = createStackNavigator();

const UnloggedNavigation = (): JSX.Element => {
  return (
    <MainStackNavigator.Navigator
      initialRouteName="Splash"
      screenOptions={{headerShown: false}}>
      <MainStackNavigator.Screen name="Splash" component={SplashScreen} />
      <MainStackNavigator.Screen name="Login" component={LoginScreen} />
    </MainStackNavigator.Navigator>
  );
};

export default UnloggedNavigation;
