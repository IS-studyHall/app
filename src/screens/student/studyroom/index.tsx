import {ParamListBase} from '@react-navigation/native';
import * as React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Button from '../../../components/atomics/atoms/button';
import Preview from '../../../components/atomics/molecules/preview';
import theme from '../../../components/providers/theme/defaultTheme';
import {buildingStore} from '../../../store/module/building';
import {studentSdk} from '../../../utils/studentSdk';
import DateRange from './components/date-range';
import TimeRange from './components/time-range';
import {timeRange} from '../../../utils/studentSdk/data';
interface Item {
  item: TimeRange;
}
const StudyroomScreen: ScreenComponentType<ParamListBase, 'Studyroom'> = ({
  route,
}) => {
  const {id} = route.params;
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
      paddingBottom: 2 * sizes.spacings.xxl,
    },
  });
  React.useEffect(() => {
    const getStudyroom = async () => {
      await studentSdk.getStudyroom(id);
    };
    getStudyroom();
  }, [id]);
  const [studyroom, setStudyroom] = React.useState<StudyRoom>();
  const [buildings, setBuildings] = React.useState<Building[]>();
  buildingStore.subscribe(() => {
    const {studyroom: studyroomState, buildings: buildingsState} =
      buildingStore.getState();
    setStudyroom(studyroomState);
    setBuildings(buildingsState);
  });
  const [date, setDate] = React.useState<Date>();
  const [time, setTime] = React.useState<string>();
  const handleSubmit = () => {
    if (studyroom && date && time) {
      studentSdk.createReservation(studyroom?._id, date, time);
    }
  };
  const renderTime = ({item}: Item) => {
    const handleSelected = () => {
      setTime(item.key);
    };
    return (
      <TimeRange
        start={item.start}
        end={item.end}
        seats={studyroom?.seats.toString() ?? ''}
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
          name={studyroom?.name}
          building={`Edificio ${
            buildings?.find(b => b._id === studyroom?.building)?.name
          }`}
          image={studyroom?.image}
          adaptToContent
          gradient
          active={studyroom?.isactive}
          favoriteButton
        />
      </View>
      <DateRange value={date} setValue={setDate} />
      <FlatList
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        scrollEnabled={false}
        numColumns={2}
        renderItem={renderTime}
        data={timeRange}
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
