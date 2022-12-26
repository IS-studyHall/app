import * as React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import theme from '../theme/defaultTheme';
interface LayoutProps {
  children: JSX.Element;
}
const Layout: React.FC<LayoutProps> = ({children}): JSX.Element => {
  const {colors} = theme;
  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background.main,
    },
    banner: {
      width: '100%',
      height: Platform.OS === 'ios' ? 72 : 50,
      backgroundColor: colors.primary.main,
    },
  });
  return (
    <View style={styles.wrapper}>
      <View style={styles.banner} />
      {children}
      <View style={styles.banner} />
    </View>
  );
};
export default Layout;
