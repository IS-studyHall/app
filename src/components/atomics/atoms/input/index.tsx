import {ViewStyle} from 'react-native';
import * as React from 'react';
import StandardInput from './standard';
import InputImage from './image';
interface InputProps {
  type?: 'standard' | 'image';
  value: string;
  error?: string;
  setValue: (e: any) => void; //gestire il tipo di e in modo adeguato
  placeholder?: string;
  style?: ViewStyle;
  hideText?: boolean;
  keyboardType?: 'numeric' | undefined;
}
const Input: React.FC<InputProps> = ({
  type,
  value,
  error,
  setValue,
  placeholder,
  style,
  hideText,
  keyboardType,
}) => {
  switch (type) {
    case 'image':
      return (
        <InputImage
          value={value}
          setValue={setValue}
          error={error}
          placeholder={placeholder}
          style={style}
        />
      );
    default:
      return (
        <StandardInput
          value={value}
          setValue={setValue}
          error={error}
          placeholder={placeholder}
          style={style}
          hideText={hideText}
          keyboardType={keyboardType}
        />
      );
  }
};
export default Input;
