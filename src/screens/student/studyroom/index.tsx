import * as React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Button from '../../../components/atomics/atoms/button';
import Preview from '../../../components/atomics/molecules/preview';
import theme from '../../../components/providers/theme/defaultTheme';
import DateRange from './components/date-range';
import TimeRange from './components/time-range';
import {content} from './data';
interface Item {
  item: TimeRange;
}
const StudyroomScreen = () => {
  const {sizes, colors} = theme;
  const styles = StyleSheet.create({
    wrapper: {
      backgroundColor: colors.background.main,
      paddingHorizontal: sizes.spacings.l,
    },
    preview: {
      height: 250,
      paddingVertical: sizes.spacings.l,
    },
    button: {
      marginTop: sizes.spacings.s,
    },
    timeRange: {
      flex: 1,
      marginHorizontal: sizes.spacings.s,
    },
    separator: {
      width: sizes.spacings.l,
      height: sizes.spacings.l,
    },
    list: {
      paddingBottom: sizes.spacings.xxl,
    },
  });
  const [day, setDay] = React.useState<number>();
  const [time, setTime] = React.useState<string>();
  const handleSubmit = () => {
    console.log('submit');
  };
  const renderTime = ({item}: Item) => {
    const handleSelected = () => {
      setTime(item.key);
    };
    return (
      <TimeRange
        start={item.start}
        end={item.end}
        seats={content.seats}
        seatsAvailable={item.seatsAvailable}
        style={styles.timeRange}
        selected={item.key === time}
        onPress={handleSelected}
      />
    );
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.preview}>
        <Preview
          name={content.name}
          image={content.image}
          adaptToContent
          gradient={false}
        />
      </View>
      <DateRange value={day} setValue={setDay} />
      <FlatList
        style={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        scrollEnabled={false}
        numColumns={2}
        renderItem={renderTime}
        data={content.timeRange}
      />
      <Button
        style={styles.button}
        title="Prenota"
        status="secondary"
        onPress={handleSubmit}
      />
    </View>
  );
};
export default StudyroomScreen;
