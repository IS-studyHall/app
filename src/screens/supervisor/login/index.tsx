import * as React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Button from '../../../components/atomics/atoms/button';
import Input from '../../../components/atomics/atoms/input';
import theme from '../../../components/providers/theme/defaultTheme';
import {useFormik as useForm} from 'formik';
import Layout from '../../../components/providers/layout';
import Text from '../../../components/atomics/atoms/text';
import {loginSupervisor, store} from '../../../store/module/auth';
const LoginScreen = (): JSX.Element => {
  const {sizes} = theme;
  const styles = StyleSheet.create({
    wrapper: {
      width: '80%',
      flexDirection: 'column',
      alignSelf: 'center',
    },
    input: {
      marginTop: sizes.spacings.s,
    },
    button: {
      marginTop: sizes.spacings.l,
    },
    image: {
      width: 185,
      height: 160,
      alignSelf: 'center',
      marginBottom: sizes.spacings.m,
    },
    text: {
      textAlign: 'center',
    },
  });
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: ({email, password}) => {
      console.log(email, password);
      store.dispatch(loginSupervisor());
    },
  });
  return (
    <Layout header={true}>
      <View style={styles.wrapper}>
        <Image
          style={styles.image}
          source={require('../../../assets/images/splash.png')}
        />
        <Text style={styles.text} type="p2" color="hint">
          Effettua l'accesso con le credenziali
        </Text>
        <Input
          style={styles.input}
          value={form.values.email}
          setValue={form.handleChange('email')}
          placeholder="email"
        />
        <Input
          style={styles.input}
          value={form.values.password}
          setValue={form.handleChange('password')}
          placeholder="password"
        />
        <Button
          title="Accedi"
          onPress={() => form.handleSubmit()}
          style={styles.button}
        />
      </View>
    </Layout>
  );
};
export default LoginScreen;
