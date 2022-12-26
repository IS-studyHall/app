import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from '../../../../atomics/atoms/text';
import theme from '../../../theme/defaultTheme';

const Header = () => {
  const {colors, sizes} = theme;
  const styles = StyleSheet.create({
    wrapper: {
      width: '100%',
      height: 100,
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: colors.primary.main,
      paddingBottom: sizes.spacings.xl,
    },
  });
  return (
    <View style={styles.wrapper}>
      <Text type="h3" color="light">
        Home
      </Text>
    </View>
  );
};
export default Header;
