import * as React from 'react';
import {Pressable, StyleSheet, View, ViewStyle} from 'react-native';
import Toast from 'react-native-toast-message';
import Text from '../../../../../components/atomics/atoms/text';
import theme from '../../../../../components/providers/theme/defaultTheme';
interface DateRangeProps {
  value: Date | undefined;
  setValue: React.Dispatch<React.SetStateAction<Date | undefined>>;
  style?: ViewStyle;
}
interface Item {
  index: number;
  disable?: boolean;
}
const DateRange: React.FC<DateRangeProps> = ({value, setValue, style}) => {
  const {sizes, colors} = theme;
  const styles = StyleSheet.create({
    wrapper: {
      flexDirection: 'row',
      marginBottom: sizes.spacings.s,
    },
  });
  const formatDate = (date: Date) => {
    date.setHours(0, 0, 0, 0);
    return date;
  };
  const today = React.useMemo(() => formatDate(new Date()), []);
  React.useEffect(() => {
    setValue(today);
  }, [setValue, today]);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const RenderItem = ({index, disable = false}: Item) => {
    const day = formatDate(new Date());
    day.setDate(day.getDate() - (day.getDay() - 1 - index));
    const itemStyles = StyleSheet.create({
      item: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:
          day.toString() === today.toString()
            ? colors.primary.main
            : value?.toString() === day.toString()
            ? colors.secondary.main
            : undefined,
        borderRadius: sizes.borderRadius.big,
        marginHorizontal: sizes.spacings.xs,
      },
      content: {
        alignItems: 'center',
        paddingVertical: sizes.spacings.m,
        paddingHorizontal: sizes.spacings.s,
      },
    });
    const handlePress = () => {
      if (today < day) {
        setValue(day);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Data non valida',
          text2: 'Assicurati di aver selezionato una data valida',
        });
      }
    };
    return (
      <View style={itemStyles.item}>
        <Pressable
          onPress={disable ? undefined : handlePress}
          style={itemStyles.content}>
          <Text type="p1" color={!disable ? 'title' : 'hint'}>
            {day.getDate().toString()}
          </Text>
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
    <View style={style}>
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
        <RenderItem index={5} disable />
        <RenderItem index={6} disable />
      </View>
      <View style={styles.wrapper}>
        <RenderItem index={7} />
        <RenderItem index={8} />
        <RenderItem index={9} />
        <RenderItem index={10} />
        <RenderItem index={11} />
        <RenderItem index={12} disable />
        <RenderItem index={13} disable />
      </View>
    </View>
  );
};
export default DateRange;
