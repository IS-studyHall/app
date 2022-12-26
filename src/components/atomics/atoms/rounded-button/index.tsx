import * as React from 'react';
import {Pressable, StyleSheet, View, ViewStyle} from 'react-native';
import theme from '../../../providers/theme/defaultTheme';
import Text from '../text';
interface ButtonProps {
  title: string;
  onPress: () => void;
  status?: 'default' | 'secondary';
  style?: ViewStyle;
  size?: 'big' | 'small';
}
const RoundedButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  status,
  size,
  style,
}) => {
  const {sizes, colors} = theme;
  const buttonColor = React.useMemo(() => {
    switch (status) {
      case 'secondary':
        return colors.secondary.main;
      default:
        return colors.primary.main;
    }
  }, [colors.primary.main, colors.secondary.main, status]);
  const buttonSize = React.useMemo(() => {
    switch (size) {
      default:
        return {
          width: 60,
          height: 60,
          borderRadius: sizes.borderRadius.extraBig,
        };
    }
  }, [size, sizes.borderRadius.extraBig]);
  const styles = StyleSheet.create({
    wrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: buttonColor,
    },
    text: {
      fontSize: 30,
    },
  });
  return (
    <Pressable onPress={onPress}>
      <View style={[styles.wrapper, buttonSize, style]}>
        <Text style={styles.text} type="p1" color="light">
          {title}
        </Text>
      </View>
    </Pressable>
  );
};
export default RoundedButton;
