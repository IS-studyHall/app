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
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import AddStudyroomBottomSheet from '../../../../atomics/organisms/add-studyroom-bottom-sheet';
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
      <AddStudyroomBottomSheet ref={bottomSheetRef} title="aula studio" />
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
          header: props => <Header title="Home" {...props} />,
        }}
      />
      <Tab.Screen name="Settings" component={SettingsSupervisorScreen} />
    </Tab.Navigator>
  );
};

export default SupervisorNavigation;
