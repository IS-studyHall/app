import * as React from 'react';
import {
  HomeSupervisorScreen,
  SettingsSupervisorScreen,
} from '../../../../../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabBar from '../../components/tab-bottom-bar';
import Header from '../../components/header';
import {Platform, StyleSheet, View} from 'react-native';
import RoundedButton from '../../../../atomics/atoms/rounded-button';
import theme from '../../../theme/defaultTheme';
const Tab = createBottomTabNavigator();
interface AdapterProps {
  children: JSX.Element;
}
const TabBarSupervisorAdapter = ({children}: AdapterProps) => {
  const {sizes} = theme;
  const styles = StyleSheet.create({
    button: {
      position: 'absolute',
      bottom: Platform.OS === 'ios' ? sizes.bottomBar : sizes.bottomBar / 2,
      alignSelf: 'center',
    },
  });
  return (
    <View>
      {children}
      <RoundedButton
        style={styles.button}
        title={'+'}
        status="secondary"
        onPress={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </View>
  );
};
const SupervisorNavigation = (): JSX.Element => {
  return (
    <Tab.Navigator
      tabBar={props => (
        <TabBarSupervisorAdapter>
          <TabBar {...props} />
        </TabBarSupervisorAdapter>
      )}>
      <Tab.Screen
        name="Home"
        component={HomeSupervisorScreen}
        options={{
          header: props => <Header {...props} />,
        }}
      />
      <Tab.Screen name="Settings" component={SettingsSupervisorScreen} />
    </Tab.Navigator>
  );
};

export default SupervisorNavigation;
