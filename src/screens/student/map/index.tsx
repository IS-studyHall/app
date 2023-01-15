import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from '../../../components/atomics/atoms/text';
import theme from '../../../components/providers/theme/defaultTheme';

const MapScreen = () => {
  const {sizes} = theme;
  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      alignItems: 'center',
      marginTop: sizes.spacings.l,
    },
  });
  return (
    <View style={styles.wrapper}>
      <Text type="h3">mappa in arrivo</Text>
    </View>
  );
};
export default MapScreen;
