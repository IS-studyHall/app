import {StyleSheet, TextInput as RNInput, View, ViewStyle} from 'react-native';
import * as React from 'react';
import theme from '../../../../providers/theme/defaultTheme';
interface InputProps {
  value: string;
  setValue: (e: string) => void;
  placeholder?: string;
  style?: ViewStyle;
}
const StandardInput: React.FC<InputProps> = ({
  value,
  setValue,
  placeholder,
  style,
}) => {
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
  const handleChange = (text: string) => {
    setValue(text);
  };
  return (
    <View style={style}>
      <RNInput
        style={styles.input}
        value={value}
        onChangeText={handleChange}
        placeholder={placeholder}
      />
    </View>
  );
};
export default StandardInput;
