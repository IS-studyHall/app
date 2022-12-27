import * as React from 'react';
import {Image, Pressable, StyleSheet, View, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../../atoms/text';
import theme from '../../../providers/theme/defaultTheme';
interface StudyroomProps {
  name: string;
  image: string;
  style?: ViewStyle | ViewStyle[];
  gradient?: boolean;
  adaptToContent?: boolean;
  onPress?: () => void;
}
const Preview: React.FC<StudyroomProps> = ({
  name,
  image,
  style,
  gradient = true,
  adaptToContent = false,
  onPress,
}) => {
  const {sizes, colors} = theme;
  const styles = StyleSheet.create({
    wrapper: {
      width: adaptToContent ? '100%' : 300,
      height: adaptToContent ? '100%' : 150,
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
      height: '60%',
      width: '100%',
      bottom: 0,
    },
  });
  return (
    <Pressable onPress={onPress}>
      <View style={[styles.wrapper, style]}>
        <Image style={styles.image} source={{uri: image}} />
        {gradient ? (
          <LinearGradient
            style={styles.linearGradient}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            colors={['transparent', colors.secondary.main ?? '']}
          />
        ) : null}
        <Text style={styles.text} type={'h3'}>
          {name}
        </Text>
      </View>
    </Pressable>
  );
};
export default Preview;
