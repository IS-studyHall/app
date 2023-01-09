import {BottomTabHeaderProps} from '@react-navigation/bottom-tabs';
import {StackHeaderProps} from '@react-navigation/stack';
import * as React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import Text from '../../../../atomics/atoms/text';
import theme from '../../../theme/defaultTheme';

interface BottomTabHeader extends BottomTabHeaderProps {
  title: string;
}
interface StackHeader extends StackHeaderProps {
  title: string;
}
const Header: React.FC<BottomTabHeader | StackHeader> = ({title}) => {
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
    index: {
      position: 'absolute',
      top: 0,
      right: 1.5 * sizes.spacings.xxl,
    },
  });
  return (
    <View style={styles.wrapper}>
      <Text type="h3" color="light">
        {title}
      </Text>
    </View>
  );
};
export default Header;
