import * as React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Text from '../../../components/atomics/atoms/text';
import theme from '../../../components/providers/theme/defaultTheme';
import {buildingStore} from '../../../store/module/building';
import {studentSdk} from '../../../utils/studentSdk';
import Reservation from './components/reservation';
import {format} from 'date-fns';
import Loader from '../../../components/atomics/atoms/loader';
const ReservationScreen = () => {
  const {sizes} = theme;
  const styles = StyleSheet.create({
    wrapper: {
      marginHorizontal: sizes.spacings.l,
      paddingTop: sizes.spacings.xl,
    },
    text: {
      marginBottom: sizes.spacings.m,
    },
    divider: {
      paddingBottom: sizes.spacings.xxl,
    },
  });
  const [activeReservations, setActiveReservations] =
    React.useState<Reservation[]>();
  const [expiredReservations, setExpiredReservations] =
    React.useState<Reservation[]>();
  const [buildings, setBuildings] = React.useState<Building[]>();
  const [studyrooms, setStudyrooms] = React.useState<StudyRoom[]>();
  const [loading, setLoading] = React.useState<boolean>();
  buildingStore.subscribe(() => {
    const {
      activeReservations: activeState,
      expiredReservations: expiredState,
      buildings: bs,
      studyrooms: ss,
      loading: load,
    } = buildingStore.getState();
    setLoading(load);
    setActiveReservations(activeState);
    setExpiredReservations(expiredState);
    setBuildings(bs);
    setStudyrooms(ss);
  });
  React.useEffect(() => {
    studentSdk.getActiveReservations();
    studentSdk.getExpiredReservations();
  }, []);
  const formattedDate = (date: number) => {
    const newDate = new Date(date);
    return format(newDate, 'dd-MM-yyyy');
  };
  return (
    <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
      <Text type="h1" style={styles.text}>
        Attivo
      </Text>
      {!loading && activeReservations ? (
        activeReservations.map(item => (
          <Reservation
            key={item._id}
            id={item._id}
            building={buildings?.find(o => o._id === item.building)?.name ?? ''}
            studyroom={
              studyrooms?.find(o => o._id === item.studyroom)?.name ?? ''
            }
            date={formattedDate(item.date)}
            start={item.start}
            end={item.end}
            lat={item.lat}
            lng={item.lng}
          />
        ))
      ) : (
        <Loader />
      )}
      <Text type="h1" style={styles.text}>
        Scaduto
      </Text>
      {!loading && expiredReservations ? (
        expiredReservations.map(item => (
          <Reservation
            key={item._id}
            id={item._id}
            building={buildings?.find(o => o._id === item.building)?.name ?? ''}
            studyroom={
              studyrooms?.find(o => o._id === item.studyroom)?.name ?? ''
            }
            date={formattedDate(item.date)}
            start={item.start}
            end={item.end}
            lat={item.lat}
            lng={item.lng}
            footer={false}
          />
        ))
      ) : (
        <Loader />
      )}
      <View style={styles.divider} />
    </ScrollView>
  );
};
export default ReservationScreen;
