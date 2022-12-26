import * as React from 'react';
import {Pressable, StyleSheet, View, ViewStyle} from 'react-native';
import theme from '../../../providers/theme/defaultTheme';
import Text from '../text';
interface ButtonProps {
  title: string;
  onPress: () => void;
  status?: 'default';
  style?: ViewStyle;
}
const Button: React.FC<ButtonProps> = ({title, onPress, status, style}) => {
  const {sizes, colors} = theme;
  const buttonColor = React.useMemo(() => {
    switch (status) {
      default:
        return colors.primary.main;
    }
  }, [colors.primary.main, status]);
  const styles = StyleSheet.create({
    wrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingVertical: sizes.spacings.s,
      backgroundColor: buttonColor,
      borderRadius: sizes.borderRadius.extraBig,
    },
  });
  return (
    <Pressable onPress={onPress}>
      <View style={[styles.wrapper, style]}>
        <Text type="p1" color="light">
          {title}
        </Text>
      </View>
    </Pressable>
  );
};
export default Button;
