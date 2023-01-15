import * as React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Text from '../../../components/atomics/atoms/text';
import theme from '../../../components/providers/theme/defaultTheme';
import {buildingStore} from '../../../store/module/building';
import {studentSdk} from '../../../utils/studentSdk';
import Reservation from './components/reservation';
import {format} from 'date-fns';
import Loader from '../../../components/atomics/atoms/loader';
import VerifyBottomSheet from '../../../components/atomics/organisms/confirm-bottomsheet';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
const ReservationScreen = () => {
  const {sizes} = theme;
  const styles = StyleSheet.create({
    wrapper: {
      backgroundColor: '#F5F5F5',
      paddingHorizontal: sizes.spacings.l,
      paddingTop: sizes.spacings.xl,
    },
    text: {
      marginBottom: sizes.spacings.m,
    },
    divider: {
      paddingBottom: sizes.spacings.xxl,
    },
    subtitle: {
      textAlign: 'center',
      marginBottom: sizes.spacings.m,
    },
  });
  const ref = React.useRef<BottomSheetModal>(null);
  const [activeReservations, setActiveReservations] =
    React.useState<Reservation[]>();
  const [expiredReservations, setExpiredReservations] =
    React.useState<Reservation[]>();
  const [buildings, setBuildings] = React.useState<Building[]>();
  const [studyrooms, setStudyrooms] = React.useState<StudyRoom[]>();
  const [reservation, setReservation] = React.useState<Reservation>();
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
  const formattedDate = (date: string) => {
    const newDate = new Date(date);
    return format(newDate, 'dd-MM-yyyy');
  };
  return (
    <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
      <Text type="h1" style={styles.text}>
        Attivo
      </Text>
      {loading ? (
        <Loader />
      ) : !activeReservations || activeReservations.length === 0 ? (
        <Text type={'p1'} style={styles.subtitle}>
          Non sono presenti prenotazioni attive
        </Text>
      ) : (
        activeReservations.map(item => {
          const studyroom = studyrooms?.find(o => o._id === item.studyroom);
          return (
            <Reservation
              key={item._id}
              building={buildings?.find(o => o._id === studyroom?.building)}
              studyroom={studyroom?.name ?? ''}
              date={formattedDate(item.date)}
              start={item.start}
              end={item.end}
              handleDelete={() => {
                setReservation(item);
                ref.current?.present();
              }}
            />
          );
        })
      )}
      <Text type="h1" style={styles.text}>
        Scaduto
      </Text>
      {loading ? (
        <Loader />
      ) : !expiredReservations || expiredReservations.length === 0 ? (
        <Text type={'p1'} style={styles.subtitle}>
          Non sono presenti prenotazioni passate
        </Text>
      ) : (
        expiredReservations.map(item => {
          const studyroom = studyrooms?.find(o => o._id === item.studyroom);
          return (
            <Reservation
              key={item._id}
              building={buildings?.find(o => o._id === studyroom?.building)}
              studyroom={studyroom?.name ?? ''}
              date={formattedDate(item.date)}
              start={item.start}
              end={item.end}
              footer={false}
            />
          );
        })
      )}
      <View style={styles.divider} />
      <VerifyBottomSheet
        ref={ref}
        title={'Elimina'}
        subtitle={`Sicuro di voler eliminare la prenotazione del ${
          reservation ? formattedDate(reservation?.date) : ''
        } alle ore ${reservation?.start} - ${reservation?.end}?`}
        confirm={async () => {
          if (reservation?._id) {
            await studentSdk.deleteReservation(reservation?._id);
            await studentSdk.getActiveReservations();
            await studentSdk.getExpiredReservations();
          }
        }}
      />
    </ScrollView>
  );
};
export default ReservationScreen;
