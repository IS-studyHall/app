import {StyleSheet, TextInput as RNInput, View, ViewStyle} from 'react-native';
import * as React from 'react';
import theme from '../../../../providers/theme/defaultTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import Text from '../../text';
interface InputProps {
  value: string;
  setValue: (e: string) => void;
  error?: string;
  placeholder?: string;
  style?: ViewStyle;
  hideText?: boolean;
}
const StandardInput: React.FC<InputProps> = ({
  value,
  setValue,
  error,
  placeholder,
  style,
  hideText,
}) => {
  const {sizes, colors} = theme;
  const styles = StyleSheet.create({
    input: {
      borderColor: error ? colors.danger.main : colors.divider,
      borderWidth: 1,
      backgroundColor: colors.base.white,
      borderRadius: sizes.borderRadius.extraSmall,
      height: 35,
      paddingHorizontal: sizes.spacings.xs,
    },
    icon: {
      flex: 1,
      flexDirection: 'column',
      position: 'absolute',
      right: 10,
      height: 35,
      justifyContent: 'center',
    },
  });
  const handleChange = (text: string) => {
    setValue(text);
  };
  const [showText, setShowText] = React.useState(false);
  return (
    <View style={style}>
      <View>
        <RNInput
          style={styles.input}
          value={value}
          onChangeText={handleChange}
          secureTextEntry={hideText ? !showText : undefined}
          placeholder={placeholder}
        />
        {hideText ? (
          <View style={styles.icon}>
            <Icon
              size={15}
              name={showText ? 'eye-off' : 'eye'}
              onPress={() => setShowText(old => !old)}
            />
          </View>
        ) : null}
      </View>
      {error ? (
        <Text type="p2" color="danger">
          {error}
        </Text>
      ) : null}
    </View>
  );
};
export default StandardInput;
