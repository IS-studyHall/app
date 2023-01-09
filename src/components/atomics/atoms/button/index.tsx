import * as React from 'react';
import {Pressable, StyleSheet, View, ViewStyle} from 'react-native';
import theme from '../../../providers/theme/defaultTheme';
import Loader from '../loader';
import Text from '../text';
interface ButtonProps {
  title: string;
  loading?: boolean;
  onPress?: () => void;
  status?:
    | 'default'
    | 'primaryOutlined'
    | 'secondary'
    | 'secondaryOutlined'
    | 'disable'
    | 'danger';
  style?: ViewStyle;
}
const Button: React.FC<ButtonProps> = ({
  title,
  loading,
  onPress,
  status,
  style,
}) => {
  const {sizes, colors} = theme;
  const buttonColor = React.useMemo(() => {
    switch (status) {
      case 'primaryOutlined':
        return {
          backgroundColor: colors.base.white,
          borderWidth: 1,
          borderColor: colors.primary.main,
        };
      case 'secondary':
        return {backgroundColor: colors.secondary.main};
      case 'secondaryOutlined':
        return {
          backgroundColor: colors.base.white,
          borderWidth: 1,
          borderColor: colors.secondary.main,
        };
      case 'danger':
        return {
          backgroundColor: colors.danger.main,
          borderWidth: 1,
          borderColor: colors.danger.main,
        };
      case 'disable':
        return {
          backgroundColor: colors.divider,
          borderWidth: 1,
          borderColor: colors.divider,
        };
      default:
        return {backgroundColor: colors.primary.main};
    }
  }, [
    colors.base.white,
    colors.danger.main,
    colors.divider,
    colors.primary.main,
    colors.secondary.main,
    status,
  ]);
  const styles = StyleSheet.create({
    wrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingVertical: sizes.spacings.s,
      borderRadius: sizes.borderRadius.extraBig,
    },
  });
  return (
    <Pressable onPress={loading ? undefined : onPress}>
      <View style={[styles.wrapper, buttonColor, style]}>
        {loading ? (
          <Loader status="light" />
        ) : (
          <Text
            type="p1"
            color={status?.includes('Outlined') ? 'title' : 'light'}>
            {title}
          </Text>
        )}
      </View>
    </Pressable>
  );
};
export default Button;
