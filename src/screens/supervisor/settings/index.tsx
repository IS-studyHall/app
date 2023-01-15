import * as React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Card from '../../../components/atomics/atoms/card';
import Text from '../../../components/atomics/atoms/text';
import theme from '../../../components/providers/theme/defaultTheme';
import {logout, authStore} from '../../../store/module/auth';
import {buildingStore, resetState} from '../../../store/module/building';
import {userStore} from '../../../store/module/user';
import Icon from 'react-native-vector-icons/AntDesign';
import {ParamListBase} from '@react-navigation/native';

interface Item {
  textLeft: string;
  textRight: string;
  last?: boolean;
}
interface ItemIcon {
  textLeft: string;
  icon: string;
  last?: boolean;
}
const SettingsScreen: ScreenComponentType<ParamListBase, 'Settings'> = ({
  navigation,
}) => {
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
    dividier: {
      marginTop: sizes.spacings.l,
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
  const RenderIconItem = ({textLeft, icon, last}: ItemIcon): JSX.Element => {
    const stylesItem = StyleSheet.create({
      wrapper: {
        flexDirection: 'row',
        paddingTop: sizes.spacings.s,
        paddingBottom: sizes.spacings.s,
        borderBottomWidth: last ? 0 : 0.5,
        borderBottomColor: colors.divider,
      },
      icon: {
        marginRight: sizes.spacings.m,
      },
      dividier: {
        marginTop: sizes.spacings.l,
      },
    });
    return (
      <View style={stylesItem.wrapper}>
        <Icon name={icon} size={25} style={stylesItem.icon} />
        <Text type={'h3'}>{textLeft}</Text>
      </View>
    );
  };
  const handlePress = () => {
    console.log('forum');
  };
  return (
    <View style={styles.wrapper}>
      <Card>
        <RenderItem textLeft="Username" textRight={user.username} />
        <RenderItem textLeft="Email" textRight={user.email} last />
      </Card>
      <Card style={styles.dividier} onPress={handlePress}>
        <RenderIconItem icon="team" textLeft="Forum" last />
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
