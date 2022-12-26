import * as React from 'react';
import {StyleSheet, Text as RNText} from 'react-native';
import theme from '../../../providers/theme/defaultTheme';
interface TextProps {
  children: string;
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p1' | 'p2';
  color?: 'title' | 'danger' | 'light' | 'hint' | 'secondary';
  style?: any;
}
const Text: React.FC<TextProps> = ({
  children,
  type,
  color,
  style,
}): JSX.Element => {
  const {typography, colors} = theme;
  const textStyle = React.useMemo(() => {
    switch (type) {
      case 'h1':
        return typography.h1;
      case 'h2':
        return typography.h2;
      case 'h3':
        return typography.h3;
      case 'h4':
        return typography.h4;
      case 'h5':
        return typography.h5;
      case 'p1':
        return typography.p1;
      case 'p2':
        return typography.p2;
    }
  }, [
    type,
    typography.h1,
    typography.h2,
    typography.h3,
    typography.h4,
    typography.h5,
    typography.p1,
    typography.p2,
  ]);
  const textColor = React.useMemo(() => {
    switch (color) {
      case 'title':
        return colors.base.black;
      case 'light':
        return colors.base.white;
      case 'danger':
        return 'red';
      case 'hint':
        return colors.divider;
      case 'secondary':
        return colors.secondary.main;
      default:
        return colors.base.black;
    }
  }, [
    color,
    colors.base.black,
    colors.base.white,
    colors.divider,
    colors.secondary.main,
  ]);
  const styles = StyleSheet.create({
    text: {
      fontSize: textStyle?.size,
      fontWeight: textStyle?.weight,
      color: textColor,
    },
  });
  return <RNText style={[styles.text, style]}>{children}</RNText>;
};
export default Text;
