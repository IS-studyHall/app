/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {Image, Platform, StyleSheet, View} from 'react-native';
import theme from '../theme/defaultTheme';
interface LayoutProps {
  children: JSX.Element[] | JSX.Element;
  header?: boolean;
}
const Layout: React.FC<LayoutProps> = ({
  children,
  header = false,
}): JSX.Element => {
  const {colors, sizes} = theme;
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
      height: Platform.OS === 'ios' ? 80 : 50,
      backgroundColor: colors.primary.main,
    },
    image: {
      width: 139,
      height: 81,
      alignSelf: 'center',
      marginBottom: sizes.spacings.xl,
    },
    index: {
      position: 'absolute',
      top: 0,
      right: 1.5 * sizes.spacings.xxl,
    },
  });
  return (
    <View style={styles.wrapper}>
      {header ? null : <View style={styles.banner} />}
      {!header ? (
        <Image
          style={styles.index}
          source={require('../../../assets/images/index.png')}
        />
      ) : null}
      <View>{children}</View>
      <View style={{width: '100%'}}>
        <Image
          style={styles.image}
          source={require('../../../assets/images/logo_unisa.png')}
        />
        <View style={styles.banner} />
      </View>
    </View>
  );
};
export default Layout;
