import * as React from 'react';
import {Pressable, StyleSheet, View, ViewStyle} from 'react-native';
import theme from '../../../providers/theme/defaultTheme';
interface CardProps {
  children: JSX.Element[] | JSX.Element;
  onPress?: () => void;
  style?: ViewStyle;
}
const Card: React.FC<CardProps> = ({children, onPress, style}) => {
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
    <Pressable style={style} onPress={onPress}>
      <View style={styles.wrapper}>{children}</View>
    </Pressable>
  );
};
export default Card;
