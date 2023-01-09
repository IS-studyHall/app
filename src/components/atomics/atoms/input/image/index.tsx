import {Keyboard, View, ViewStyle} from 'react-native';
import * as React from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import Button from '../../button';
import Text from '../../text';

interface InputProps {
  value: string;
  setValue: (e: string) => void;
  error?: string;
  placeholder?: string;
  style?: ViewStyle;
}
const InputImage: React.FC<InputProps> = ({value, setValue, error, style}) => {
  const handleChoosePhoto = () => {
    launchImageLibrary(
      {
        includeBase64: true,
        mediaType: 'photo',
      },
      response => {
        if (response.assets) {
          Keyboard.dismiss();
          const prew =
            /*response.assets[0].type === 'image/jpg' ||
            response.assets[0].type === 'image/jpeg'
              ? 'data:image/jpeg;base64,'
              :*/ 'data:image/png;base64,';
          setValue(`${prew}${response.assets[0].base64 ?? ''}`);
        }
      },
    );
  };
  return (
    <View style={style}>
      <Button
        status={!value || value === '' ? 'secondary' : 'secondaryOutlined'}
        title={
          !value || value === '' ? 'aggiungi immagine' : 'immagine aggiunta'
        }
        onPress={handleChoosePhoto}
      />
      {error ? (
        <View>
          <Text type="p2" color="danger">
            {error}
          </Text>
        </View>
      ) : null}
    </View>
  );
};
export default InputImage;
