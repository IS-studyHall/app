import * as React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Card from '../../components/atomics/atoms/card';
import Text from '../../components/atomics/atoms/text';
import theme from '../../components/providers/theme/defaultTheme';
interface Item {
  text: string;
  icon: string;
}
const SettingsScreen = () => {
  const {sizes} = theme;
  const styles = StyleSheet.create({
    wrapper: {
      marginTop: sizes.spacings.l,
      marginHorizontal: sizes.spacings.l,
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    logout: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    text: {
      fontWeight: 'bold',
    },
  });
  const RenderItem = ({text, icon}: Item): JSX.Element => {
    return (
      <View style={styles.item}>
        <Text type="p1">{text}</Text>
        <Text type="p1">{icon}</Text>
      </View>
    );
  };
  return (
    <View style={styles.wrapper}>
      <Card>
        <RenderItem text="ciao" icon="arrow" />
        <RenderItem text="ciao" icon="arrow" />
        <RenderItem text="ciao" icon="arrow" />
        <RenderItem text="ciao" icon="arrow" />
      </Card>
      <Pressable style={styles.logout}>
        <Text style={styles.text} type="p1" color="danger">
          Log out
        </Text>
      </Pressable>
    </View>
  );
};
export default SettingsScreen;
