import * as React from 'react';
import {
  HomeSupervisorScreen,
  ReservationsSupervisorScreen,
  SettingsSupervisorScreen,
  StudyroomSupervisorScreen,
} from '../../../../../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabBar from '../../components/tab-bottom-bar';
import Header from '../../components/header';
import {Platform, StyleSheet, View} from 'react-native';
import RoundedButton from '../../../../atomics/atoms/rounded-button';
import theme from '../../../theme/defaultTheme';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import AddStudyroomBottomSheet from '../../../../atomics/organisms/add-studyroom-bottom-sheet';
import {createStackNavigator} from '@react-navigation/stack';
import BackHeader from '../../components/back-header';
import {supervisorSdk} from '../../../../../utils/supervisorSdk';
const Tab = createBottomTabNavigator();
const SupervisorStackNavigator = createStackNavigator();

interface AdapterProps {
  children: JSX.Element;
}
const TabBarSupervisorAdapter = ({children}: AdapterProps) => {
  const {sizes} = theme;
  const styles = StyleSheet.create({
    button: {
      position: 'absolute',
      bottom:
        Platform.OS === 'ios'
          ? 1.5 * sizes.bottomBar
          : (1.5 * sizes.bottomBar) / 2,
      alignSelf: 'center',
    },
  });
  const bottomSheetRef = React.useRef<BottomSheetModal>(null);
  const handleAddStudyroom = () => {
    bottomSheetRef.current?.present();
  };
  return (
    <View>
      {children}
      <RoundedButton
        style={styles.button}
        title={'+'}
        status="secondary"
        onPress={handleAddStudyroom}
      />
      <AddStudyroomBottomSheet
        ref={bottomSheetRef}
        onSubmit={async () => await supervisorSdk.getStudyrooms()}
      />
    </View>
  );
};
const SupervisorTabBar = (): JSX.Element => {
  return (
    <Tab.Navigator
      tabBar={props => (
        <TabBarSupervisorAdapter>
          <TabBar {...props} supervisor />
        </TabBarSupervisorAdapter>
      )}>
      <Tab.Screen
        name="Home"
        component={HomeSupervisorScreen}
        options={{
          header: props => <Header title="Aule Studio" {...props} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsSupervisorScreen}
        options={{
          header: props => <Header title="Impostazioni" {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

const SupervisorNavigation = (): JSX.Element => {
  const {colors} = theme;
  React.useEffect(() => {
    const getData = async () => {
      await supervisorSdk.getBuilding();
      await supervisorSdk.getStudyrooms();
      await supervisorSdk.getUser();
    };
    getData();
  }, []);
  return (
    <SupervisorStackNavigator.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: colors.background.main},
      }}>
      <SupervisorStackNavigator.Screen
        options={{headerShown: false}}
        name="TabBar"
        component={SupervisorTabBar}
      />
      <SupervisorStackNavigator.Screen
        name="studyroom"
        component={StudyroomSupervisorScreen}
        options={{
          header: props => <BackHeader title="Aula Studio" {...props} />,
        }}
      />
      <SupervisorStackNavigator.Screen
        name="reservations"
        component={ReservationsSupervisorScreen}
        options={{
          header: props => <BackHeader title="Prenotazioni" {...props} />,
        }}
      />
    </SupervisorStackNavigator.Navigator>
  );
};
export default SupervisorNavigation;
