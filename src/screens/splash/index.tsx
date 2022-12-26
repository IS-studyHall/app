import * as React from 'react';
import {Dimensions, Image, StyleSheet} from 'react-native';
import Layout from '../../components/providers/layout';
import theme from '../../components/providers/theme/defaultTheme';

const SplashScreen = () => {
  const {width} = Dimensions.get('screen');
  const {sizes} = theme;
  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: width - 3 * sizes.spacings.xxl,
      height: 267,
    },
  });
  return (
    <Layout>
      <Image
        style={styles.image}
        source={require('../../assets/images/splash.png')}
      />
    </Layout>
  );
};
export default SplashScreen;
