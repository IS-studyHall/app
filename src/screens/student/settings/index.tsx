import * as React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Card from '../../../components/atomics/atoms/card';
import Text from '../../../components/atomics/atoms/text';
import theme from '../../../components/providers/theme/defaultTheme';
import {logout, authStore} from '../../../store/module/auth';
import {buildingStore, resetState} from '../../../store/module/building';
import {userStore} from '../../../store/module/user';
interface Item {
  textLeft: string;
  textRight: string;
  last?: boolean;
}
const SettingsScreen = () => {
  const {sizes, colors} = theme;
  const styles = StyleSheet.create({
    wrapper: {
      marginTop: sizes.spacings.l,
      marginHorizontal: sizes.spacings.l,
    },
    logout: {
      paddingTop: sizes.spacings.xxl,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    text: {
      fontWeight: 'bold',
    },
  });
  const RenderItem = ({textLeft, textRight, last}: Item): JSX.Element => {
    const stylesItem = StyleSheet.create({
      wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: sizes.spacings.s,
        paddingBottom: sizes.spacings.s,
        borderBottomWidth: last ? 0 : 0.5,
        borderBottomColor: colors.divider,
      },
    });
    return (
      <View style={stylesItem.wrapper}>
        <Text type="p1">{textLeft}</Text>
        <Text type="p1">{textRight}</Text>
      </View>
    );
  };
  const user = userStore.getState().user;
  const handleLogout = () => {
    buildingStore.dispatch(resetState());
    authStore.dispatch(logout());
  };
  return (
    <View style={styles.wrapper}>
      <Card>
        <RenderItem textLeft="username" textRight={user.username} last />
      </Card>
      <Pressable style={styles.logout} onPress={handleLogout}>
        <Text style={styles.text} type="p1" color="danger">
          Log out
        </Text>
      </Pressable>
    </View>
  );
};
export default SettingsScreen;
