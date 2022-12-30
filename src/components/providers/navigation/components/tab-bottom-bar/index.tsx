import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
//import Icon, {IconName} from 'components/atomics/atoms/icon';
//import {useInsets, useTheme, useTranslation} from 'components/hooks';
import * as React from 'react';
import {Platform, Pressable, StyleSheet, View} from 'react-native';
import Text from '../../../../atomics/atoms/text';
//import LinearGradient from 'react-native-linear-gradient';
import theme from '../../../theme/defaultTheme';
import Icon from 'react-native-vector-icons/AntDesign';

const tabIconsUnselected: {[key: string]: string} = {
  Home: 'home',
  Prenotazioni: 'book',
  Impostazioni: 'setting',
  // Dashboard: 'dashboard',
};

/*const tabIconsSelected: {[key: string]: IconName} = {
  Workout: 'workoutSelected',
  Nutrition: 'nutritionSelected',
  Chat: 'chatDoubleSelected',
  Knowledge: 'compassSelected',
  // Dashboard: 'dashboard',
};*/
const studentScreens = ['Home', 'Prenotazioni', 'Impostazioni'];
const supervisorScreens = ['Home', 'Impostazioni'];

interface BottomTabBar extends BottomTabBarProps {
  supervisor?: boolean;
}
const TabBar: React.FC<BottomTabBar> = ({
  state,
  navigation,
  supervisor = false,
}) => {
  const {sizes, colors} = theme;

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingVertical: sizes.spacings.s,
      paddingHorizontal: sizes.spacings.s,
      paddingBottom: Platform.select({ios: sizes.bottomBar}),
      backgroundColor: colors.primary.main,
    },
    tabButton: {
      alignItems: 'center',
      flex: 1,
    },
    tabButtonIcon: {
      marginBottom: 4,
    },
  });
  const screens = supervisor ? supervisorScreens : studentScreens;
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = (): void => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true} as never);
          }
        };
        return (
          <Pressable
            style={styles.tabButton}
            onPress={onPress}
            key={route.name}>
            <Icon
              disabled
              name={tabIconsUnselected[screens[index]]}
              color="white"
              size={25}
            />
            <Text
              type="p1"
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                color: isFocused ? 'white' : 'black',
                marginTop: sizes.spacings.xs,
              }}>
              {screens[index]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default TabBar;
