import {ParamListBase} from '@react-navigation/native';
import * as React from 'react';
import {
  FlatList,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
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
import Text from '../../../components/atomics/atoms/text';
interface Item {
  item: TimeRange;
  index: number;
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
    date: {
      marginVertical: sizes.spacings.xl,
    },
    desc: {
      marginTop: sizes.spacings.s,
      textAlign: 'center',
    },
  });
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
  const [assignedSeats, setAssignedSeats] = React.useState<AssignedSeat[]>();
  React.useEffect(() => {
    const getStudyroom = async () => {
      await studentSdk.getStudyroom(id);
    };
    getStudyroom();
  }, [id]);
  React.useEffect(() => {
    const getAssignedSeats = async () => {
      if (date) {
        setLoading(true);
        const data: AssignedSeat[] = await studentSdk.getAssignedSeats(
          id,
          date,
        );
        setAssignedSeats(data);
        setLoading(false);
      }
    };
    getAssignedSeats();
  }, [date, id]);
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
        navigation.navigate('Reservation');
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
    const seatsByTime = assignedSeats
      ? assignedSeats
          .find(a => a._id.start === item.start && a._id.end === item.end)
          ?.count.toString()
      : undefined;
    return (
      <TimeRange
        start={item.start}
        end={item.end}
        seats={studyroom?.seats}
        seatsAvailable={seatsByTime ?? '0'}
        style={styles.timeRange}
        selected={item.key === time}
        onPress={handleSelected}
      />
    );
  };
  const building = studyroom
    ? buildings?.find(b => b._id === studyroom.building)?.name
    : '';
  const sendEmail = () => {
    Linking.openURL(
      `mailto:${studyroom?.email}?subject=Segnala un problema - ${studyroom?.name} Ed. ${building}`,
    ); //modificare l'email
  };
  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.preview}>
        {studyroom ? (
          <Preview
            id={studyroom._id}
            name={studyroom.name}
            building={`Edificio ${building}`}
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
      <DateRange style={styles.date} value={date} setValue={setDate} />
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
        status={studyroom && studyroom.isactive ? 'secondary' : 'disable'}
        loading={loading}
        onPress={studyroom && studyroom.isactive ? handleSubmit : undefined}
      />
      <Pressable onPress={sendEmail}>
        <Text type="p1" style={styles.desc} color="url">
          Segnala un problema
        </Text>
      </Pressable>
      <Toast position="top" topOffset={10} />
    </ScrollView>
  );
};
export default StudyroomScreen;
