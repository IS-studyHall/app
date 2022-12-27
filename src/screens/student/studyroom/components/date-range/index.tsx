import * as React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Text from '../../../../../components/atomics/atoms/text';
import theme from '../../../../../components/providers/theme/defaultTheme';
interface DateRangeProps {
  value: number | undefined;
  setValue: React.Dispatch<React.SetStateAction<number | undefined>>;
}
interface Item {
  index: number;
}
const DateRange: React.FC<DateRangeProps> = ({value, setValue}) => {
  const {sizes, colors} = theme;
  const styles = StyleSheet.create({
    wrapper: {
      flexDirection: 'row',
      marginBottom: sizes.spacings.s,
    },
  });
  const today = React.useMemo(() => new Date(), []);
  React.useEffect(() => {
    setValue(today.getDate());
  }, [setValue, today]);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const RenderItem = ({index}: Item) => {
    const day = new Date();
    day.setDate(day.getDate() - (day.getDay() - 1 - index));
    const itemStyles = StyleSheet.create({
      item: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:
          day.getDate() === today.getDate()
            ? colors.primary.main
            : value === day.getDate()
            ? colors.secondary.main
            : undefined,
        borderRadius: sizes.borderRadius.extraBig,
      },
      content: {
        alignItems: 'center',
        paddingVertical: sizes.spacings.m,
        paddingHorizontal: sizes.spacings.s,
      },
    });
    const handlePress = () => {
      if (today <= day) {
        setValue(day.getDate());
      }
    };
    return (
      <View style={itemStyles.item}>
        <Pressable onPress={handlePress} style={itemStyles.content}>
          <Text type="p1">{day.getDate().toString()}</Text>
        </Pressable>
      </View>
    );
  };
  const RenderDay = ({index}: Item) => {
    const itemStyles = StyleSheet.create({
      item: {
        flex: 1,
        alignItems: 'center',
        borderRadius: sizes.borderRadius.big,
      },
      content: {
        alignItems: 'center',
        paddingVertical: sizes.spacings.xs,
      },
    });
    return (
      <View style={itemStyles.item}>
        <Text type="p1" color="title">
          {days[index % 7]}
        </Text>
      </View>
    );
  };
  return (
    <View>
      <View style={styles.wrapper}>
        <RenderDay index={0} />
        <RenderDay index={1} />
        <RenderDay index={2} />
        <RenderDay index={3} />
        <RenderDay index={4} />
        <RenderDay index={5} />
        <RenderDay index={6} />
      </View>
      <View style={styles.wrapper}>
        <RenderItem index={0} />
        <RenderItem index={1} />
        <RenderItem index={2} />
        <RenderItem index={3} />
        <RenderItem index={4} />
        <RenderItem index={5} />
        <RenderItem index={6} />
      </View>
      <View style={styles.wrapper}>
        <RenderItem index={7} />
        <RenderItem index={8} />
        <RenderItem index={9} />
        <RenderItem index={10} />
        <RenderItem index={11} />
        <RenderItem index={12} />
        <RenderItem index={13} />
      </View>
    </View>
  );
};
export default DateRange;
