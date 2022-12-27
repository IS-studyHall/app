import * as React from 'react';
import {
  HomeStudentScreen,
  ReservationStudentScreen,
  SettingsStudentScreen,
} from '../../../../../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabBar from '../../components/tab-bottom-bar';
import Header from '../../components/header';
import {createStackNavigator} from '@react-navigation/stack';
import StudyroomScreen from '../../../../../screens/student/studyroom';
import BackHeader from '../../components/back-header';
const Tab = createBottomTabNavigator();
const StudentStackNavigator = createStackNavigator();

const StudentTabBar = (): JSX.Element => {
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeStudentScreen}
        options={{
          header: props => <Header {...props} />,
        }}
      />
      <Tab.Screen
        name="Reservation"
        options={{
          header: props => <Header {...props} />,
        }}
        component={ReservationStudentScreen}
      />
      <Tab.Screen name="Settings" component={SettingsStudentScreen} />
    </Tab.Navigator>
  );
};

const StudentNavigation = (): JSX.Element => {
  return (
    <StudentStackNavigator.Navigator>
      <StudentStackNavigator.Screen
        options={{headerShown: false}}
        name="TabBar"
        component={StudentTabBar}
      />
      <StudentStackNavigator.Screen
        name="studyroom"
        component={StudyroomScreen}
        options={{
          header: props => <BackHeader {...props} />,
        }}
      />
    </StudentStackNavigator.Navigator>
  );
};

export default StudentNavigation;
