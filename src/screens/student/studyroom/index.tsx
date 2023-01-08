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
import Loader from '../../../components/atomics/atoms/loader';
import Toast from 'react-native-toast-message';
interface Item {
  item: TimeRange;
}
const StudyroomScreen: ScreenComponentType<ParamListBase, 'Studyroom'> = ({
  route,
  navigation,
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
  const [favorites, setFavorites] = React.useState<Favorite[]>();
  const [loading, setLoading] = React.useState<boolean>(true);
  buildingStore.subscribe(() => {
    const {
      studyroom: studyroomState,
      buildings: buildingsState,
      loading: load,
      favorites: favoritesState,
    } = buildingStore.getState();
    setStudyroom(studyroomState);
    setBuildings(buildingsState);
    setFavorites(favoritesState);
    setLoading(load);
  });
  const [date, setDate] = React.useState<Date>();
  const [time, setTime] = React.useState<string>();
  const handleSubmit = async () => {
    if (studyroom && date && time) {
      const data = await studentSdk.createReservation(
        studyroom._id,
        date,
        time,
      );
      if (data) {
        await studentSdk.getActiveReservations();
        await studentSdk.getExpiredReservations();
        navigation.goBack();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Prenotazione non valida',
          text2: 'Controlla le prenotazioni nel giorno e orario seleionato',
        });
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Campi richiesti',
        text2: 'Assicurati di aver inserito tutti i campi',
      });
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
        seats={studyroom?.seats}
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
        {studyroom ? (
          <Preview
            id={studyroom._id}
            name={studyroom.name}
            building={`Edificio ${
              buildings?.find(b => b._id === studyroom.building)?.name
            }`}
            image={studyroom.image}
            active={studyroom.isactive}
            favoriteState={
              favorites
                ? favorites.findIndex(o => o.studyroom === studyroom._id) > -1
                : undefined
            }
            adaptToContent
            gradient
          />
        ) : (
          <Loader />
        )}
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
        loading={loading}
        onPress={handleSubmit}
      />
      <Toast position="top" topOffset={10} />
    </View>
  );
};
export default StudyroomScreen;
