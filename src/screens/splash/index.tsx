import {ParamListBase} from '@react-navigation/native';
import * as React from 'react';
import {Dimensions, Image, StyleSheet} from 'react-native';
import Button from '../../components/atomics/atoms/button';
import Layout from '../../components/providers/layout';
import theme from '../../components/providers/theme/defaultTheme';

const SplashScreen: ScreenComponentType<ParamListBase, 'Splash'> = ({
  navigation,
}) => {
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
    button: {
      marginTop: sizes.spacings.s,
    },
  });
  const handleLoginSupervisor = () => {
    navigation.navigate('LoginSupervisor', {title: 'Supervisor'});
  };
  const handleLoginStudent = () => {
    navigation.navigate('LoginStudent', {title: 'Studente'});
  };
  return (
    <Layout>
      <Image
        style={styles.image}
        source={require('../../assets/images/splash.png')}
      />
      <Button
        style={styles.button}
        title="accedi come Studente"
        onPress={handleLoginStudent}
      />
      <Button
        style={styles.button}
        status="secondary"
        title="accedi come Supervisor"
        onPress={handleLoginSupervisor}
      />
    </Layout>
  );
};
export default SplashScreen;
