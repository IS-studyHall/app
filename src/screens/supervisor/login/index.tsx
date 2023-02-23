import * as React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Button from '../../../components/atomics/atoms/button';
import Input from '../../../components/atomics/atoms/input';
import theme from '../../../components/providers/theme/defaultTheme';
import {useFormik as useForm} from 'formik';
import Layout from '../../../components/providers/layout';
import Text from '../../../components/atomics/atoms/text';
import {supervisorSdk} from '../../../utils/supervisorSdk';
import * as Yup from 'yup';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import ObservedScreen from '../../observer';
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('formato email non valido')
    .required('campo richiesto'),
  password: Yup.string()
    .min(7, 'password non valida')
    .required('campo richiesto'),
});
const LoginScreen = (): JSX.Element => {
  const {sizes} = theme;
  const styles = StyleSheet.create({
    wrapper: {
      width: '80%',
      flexDirection: 'column',
      alignSelf: 'center',
      marginTop: 1.5 * sizes.spacings.xxl,
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
  const [loading, setLoading] = React.useState<boolean>(false);
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validateOnChange: false,
    validationSchema: LoginSchema,
    onSubmit: async ({email, password}) => {
      setLoading(true);
      const data = await supervisorSdk.login(email, password);
      if (data === null) {
        Toast.show({
          type: 'error',
          text1: 'Username e/o password errati',
          text2: 'Verifica i campi inseriti',
        });
      }
      setLoading(false);
    },
  });
  return (
    <ObservedScreen screenId="loginSupervisor">
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
            error={form.errors.email}
            placeholder="email"
          />
          <Input
            style={styles.input}
            value={form.values.password}
            hideText
            setValue={form.handleChange('password')}
            error={form.errors.password}
            placeholder="password"
          />
          <Button
            title="Accedi"
            onPress={() => form.handleSubmit()}
            loading={loading}
            style={styles.button}
          />
        </View>
        <Toast position="top" topOffset={10} />
      </Layout>
    </ObservedScreen>
  );
};
export default LoginScreen;
