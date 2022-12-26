import * as React from 'react';
import {Image, StyleSheet, View, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../../../../components/atomics/atoms/text';
import theme from '../../../../components/providers/theme/defaultTheme';
interface StudyroomProps {
  name: string;
  image: string;
  style: ViewStyle;
}
const Studyroom: React.FC<StudyroomProps> = ({name, image, style}) => {
  const {sizes} = theme;
  const styles = StyleSheet.create({
    wrapper: {
      width: 300,
      height: 150,
      borderRadius: sizes.borderRadius.big,
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    text: {
      position: 'absolute',
      bottom: sizes.spacings.s,
      right: sizes.spacings.m,
      color: 'white',
    },
    linearGradient: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      bottom: 0,
    },
  });
  return (
    <View style={[styles.wrapper, style]}>
      <Image style={styles.image} source={{uri: image}} />
      <LinearGradient
        style={styles.linearGradient}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={['transparent', '#192f6a']}
      />
      <Text style={styles.text} type={'h3'}>
        {name}
      </Text>
    </View>
  );
};
export default Studyroom;
