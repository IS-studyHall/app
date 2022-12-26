import * as React from 'react';
import {HomeStudentScreen, SettingsStudentScreen} from '../../../../../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabBar from '../../components/tab-bottom-bar';
import Header from '../../components/header';
const Tab = createBottomTabNavigator();

const StudentNavigation = (): JSX.Element => {
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeStudentScreen}
        options={{
          header: props => <Header {...props} />,
        }}
      />
      <Tab.Screen name="Settings" component={SettingsStudentScreen} />
    </Tab.Navigator>
  );
};

export default StudentNavigation;
