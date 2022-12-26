import {StyleSheet, TextInput as RNInput, View, ViewStyle} from 'react-native';
import * as React from 'react';
import theme from '../../../providers/theme/defaultTheme';
interface InputProps {
  value: string;
  setValue: (e: React.ChangeEvent<any>) => void;
  placeholder?: string;
  style?: ViewStyle;
}
const Input: React.FC<InputProps> = ({value, setValue, placeholder, style}) => {
  const {sizes, colors} = theme;
  const styles = StyleSheet.create({
    input: {
      borderColor: colors.divider,
      borderWidth: 1,
      backgroundColor: colors.base.white,
      borderRadius: sizes.borderRadius.extraSmall,
      height: 35,
      paddingHorizontal: sizes.spacings.xs,
    },
  });
  return (
    <View style={style}>
      <RNInput
        style={styles.input}
        value={value}
        onChange={setValue}
        placeholder={placeholder}
      />
    </View>
  );
};
export default Input;
