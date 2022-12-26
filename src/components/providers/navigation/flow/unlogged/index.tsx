import * as React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {
  LoginStudentScreen,
  LoginSupervisorScreen,
} from '../../../../../screens';
import SplashScreen from '../../../../../screens/splash';
import BackHeader from '../../components/back-header';

const MainStackNavigator = createStackNavigator();

const UnloggedNavigation = (): JSX.Element => {
  return (
    <MainStackNavigator.Navigator
      initialRouteName="Splash"
      screenOptions={{headerShown: true}}>
      <MainStackNavigator.Screen
        name="Splash"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <MainStackNavigator.Screen
        name="LoginStudent"
        component={LoginStudentScreen}
        options={{
          header: props => <BackHeader {...props} />,
        }}
      />
      <MainStackNavigator.Screen
        name="LoginSupervisor"
        component={LoginSupervisorScreen}
        options={{
          header: props => <BackHeader {...props} />,
        }}
      />
    </MainStackNavigator.Navigator>
  );
};

export default UnloggedNavigation;
