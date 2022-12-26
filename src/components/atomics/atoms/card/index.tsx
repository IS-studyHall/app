import * as React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import theme from '../../../providers/theme/defaultTheme';
interface CardProps {
  children: JSX.Element[];
  onPress?: () => void;
}
const Card: React.FC<CardProps> = ({children, onPress}) => {
  const {sizes, colors} = theme;
  const styles = StyleSheet.create({
    wrapper: {
      paddingHorizontal: sizes.spacings.l,
      paddingVertical: sizes.spacings.s,
      backgroundColor: colors.base.white,
      borderRadius: sizes.borderRadius.big,
      width: '100%',
    },
  });
  return (
    <Pressable onPress={onPress}>
      <View style={styles.wrapper}>{children}</View>
    </Pressable>
  );
};
export default Card;
