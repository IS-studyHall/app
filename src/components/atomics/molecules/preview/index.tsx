import * as React from 'react';
import {Image, Pressable, StyleSheet, View, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../../atoms/text';
import theme from '../../../providers/theme/defaultTheme';
import Icon from 'react-native-vector-icons/AntDesign';
interface StudyroomProps {
  name: string;
  building?: string;
  image: string;
  style?: ViewStyle | ViewStyle[];
  gradient?: boolean;
  adaptToContent?: boolean;
  active?: boolean;
  favoriteButton?: boolean;
  onPress?: () => void;
}
const Preview: React.FC<StudyroomProps> = ({
  name,
  building,
  image,
  style,
  gradient = true,
  adaptToContent = false,
  active,
  favoriteButton = false,
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
    bottomLeftText: {
      textTransform: 'capitalize',
      position: 'absolute',
      bottom: sizes.spacings.s,
      left: sizes.spacings.m,
    },
    topRightText: {
      position: 'absolute',
      top: sizes.spacings.m,
      right: sizes.spacings.m,
      paddingHorizontal: sizes.spacings.s,
      paddingVertical: sizes.spacings.xs,
      backgroundColor: active ? colors.primary.main : colors.divider,
      borderRadius: sizes.borderRadius.extraBig,
    },
    bottomRight: {
      position: 'absolute',
      bottom: sizes.spacings.s,
      right: sizes.spacings.m,
    },
    linearGradient: {
      position: 'absolute',
      height: '60%',
      width: '100%',
      bottom: 0,
    },
  });
  const [favorite, setFavorite] = React.useState<boolean>(false);
  const handlePress = () => {
    setFavorite(old => !old);
  };
  const title = React.useMemo(() => {
    return building ? `${building} - ${name}` : `${name}`;
  }, [building, name]);
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
        <Text style={styles.bottomLeftText} type={'h3'} color="light">
          {title}
        </Text>
        {active !== undefined ? (
          <View style={styles.topRightText}>
            <Text type={'p1'} color="light">
              {active ? 'Active' : 'Inactive'}
            </Text>
          </View>
        ) : null}
        {favoriteButton ? (
          <View style={styles.bottomRight}>
            <Pressable onPress={handlePress}>
              {favorite ? (
                <Icon disabled name="heart" color="white" size={25} />
              ) : (
                <Icon disabled name="hearto" color="white" size={25} />
              )}
            </Pressable>
          </View>
        ) : null}
      </View>
    </Pressable>
  );
};
export default Preview;
