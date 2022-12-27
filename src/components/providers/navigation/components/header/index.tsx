import {BottomTabHeaderProps} from '@react-navigation/bottom-tabs';
import {StackHeaderProps} from '@react-navigation/stack';
import * as React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import Text from '../../../../atomics/atoms/text';
import theme from '../../../theme/defaultTheme';

const Header: React.FC<BottomTabHeaderProps | StackHeaderProps> = () => {
  const {colors, sizes} = theme;
  const styles = StyleSheet.create({
    wrapper: {
      width: '100%',
      height: Platform.OS === 'ios' ? 80 : 50,
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: colors.primary.main,
      paddingBottom: sizes.spacings.m,
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
