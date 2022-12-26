import * as React from 'react';

import {HomeScreen, SettingsScreen} from '../../../../../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyTabBar from '../../components/tab-bottom-bar';
import Header from '../../components/header';
const Tab = createBottomTabNavigator();

const MainNavigation = (): JSX.Element => {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header: () => <Header />,
        }}
      />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default MainNavigation;
