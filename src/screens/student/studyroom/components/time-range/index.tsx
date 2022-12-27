import * as React from 'react';
import {Pressable, StyleSheet, View, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../../../../../components/atomics/atoms/text';
import theme from '../../../../../components/providers/theme/defaultTheme';
interface TimeRangeProps {
  start: string;
  end: string;
  seats: string;
  seatsAvailable: string;
  selected?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}
const TimeRange: React.FC<TimeRangeProps> = ({
  start,
  end,
  seatsAvailable,
  seats,
  selected = false,
  onPress,
  style,
}) => {
  const {sizes, colors} = theme;
  const styles = StyleSheet.create({
    wrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderWidth: 3,
      borderColor: colors.secondary.main,
      paddingHorizontal: sizes.spacings.m,
      paddingVertical: sizes.spacings.m,
      borderRadius: sizes.borderRadius.normal,
    },
    seats: {
      position: 'absolute',
      bottom: -7,
      paddingHorizontal: sizes.spacings.xs,
      alignSelf: 'center',
      backgroundColor: colors.background.main,
    },
    linearGradient: {
      width: '100%',
      height: '90%',
      position: 'absolute',
      borderRadius: sizes.borderRadius.normal,
    },
  });
  return (
    <Pressable style={style} onPress={onPress}>
      <View style={styles.wrapper}>
        <Text type="p1">{start}</Text>
        <Text type="p1">-</Text>
        <Text type="p1">{end}</Text>
      </View>
      <View style={styles.seats}>
        <Text type="p2" color="secondary">{`${seatsAvailable}/${seats}`}</Text>
      </View>
      {selected ? (
        <LinearGradient
          style={[styles.linearGradient]}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={[colors.secondary.main ?? '', 'transparent']}
        />
      ) : null}
    </Pressable>
  );
};
export default TimeRange;
