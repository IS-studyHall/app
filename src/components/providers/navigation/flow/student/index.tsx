import * as React from 'react';
import {
  HomeStudentScreen,
  ReservationStudentScreen,
  SettingsStudentScreen,
  StudyroomStudentScreen,
} from '../../../../../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabBar from '../../components/tab-bottom-bar';
import Header from '../../components/header';
import {createStackNavigator} from '@react-navigation/stack';
import BackHeader from '../../components/back-header';
import theme from '../../../theme/defaultTheme';
import {studentSdk} from '../../../../../utils/studentSdk';
const Tab = createBottomTabNavigator();
const StudentStackNavigator = createStackNavigator();

const StudentTabBar = (): JSX.Element => {
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeStudentScreen}
        options={{
          header: props => <Header title="Home" {...props} />,
        }}
      />
      <Tab.Screen
        name="Reservation"
        options={{
          header: props => <Header title="Prenotazioni" {...props} />,
        }}
        component={ReservationStudentScreen}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStudentScreen}
        options={{
          header: props => <Header title="Impostazioni" {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

const StudentNavigation = (): JSX.Element => {
  const {colors} = theme;
  React.useEffect(() => {
    const getData = async () => {
      await studentSdk.getFavorites();
      await studentSdk.getBuilding();
      await studentSdk.getStudyrooms();
      await studentSdk.getAllStudyrooms();
      await studentSdk.getUser();
    };
    console.log('FETCH STUDENT DATA');
    getData();
  }, []);
  return (
    <StudentStackNavigator.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: colors.background.main},
      }}>
      <StudentStackNavigator.Screen
        options={{headerShown: false}}
        name="TabBar"
        component={StudentTabBar}
      />
      <StudentStackNavigator.Screen
        name="studyroom"
        component={StudyroomStudentScreen}
        options={{
          header: props => <BackHeader {...props} />,
        }}
      />
    </StudentStackNavigator.Navigator>
  );
};

export default StudentNavigation;
