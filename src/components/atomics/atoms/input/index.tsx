import {ViewStyle} from 'react-native';
import * as React from 'react';
import StandardInput from './standard';
import InputImage from './image';
interface InputProps {
  type?: 'standard' | 'image';
  value: string;
  setValue: (e: any) => void; //gestire il tipo di e in modo adeguato
  placeholder?: string;
  style?: ViewStyle;
}
const Input: React.FC<InputProps> = ({
  type,
  value,
  setValue,
  placeholder,
  style,
}) => {
  switch (type) {
    case 'image':
      return (
        <InputImage
          value={value}
          setValue={setValue}
          placeholder={placeholder}
          style={style}
        />
      );
    default:
      return (
        <StandardInput
          value={value}
          setValue={setValue}
          placeholder={placeholder}
          style={style}
        />
      );
  }
};
export default Input;
