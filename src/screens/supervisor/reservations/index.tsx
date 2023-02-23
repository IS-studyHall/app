import {ParamListBase} from '@react-navigation/native';
import {format} from 'date-fns';
import * as React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import theme from '../../../components/providers/theme/defaultTheme';
import {buildingStore} from '../../../store/module/building';
import {supervisorSdk} from '../../../utils/supervisorSdk';
import Reservation from '../../student/reservation/components/reservation';
interface Item {
  item: Reservation;
}
const ReservationsScreen: ScreenComponentType<
  ParamListBase,
  'Reservations'
> = ({route}) => {
  const {id} = route.params;
  const {sizes} = theme;
  const styles = StyleSheet.create({
    wrapper: {
      backgroundColor: '#F0F0F0',
      paddingTop: sizes.spacings.l,
      paddingHorizontal: sizes.spacings.l,
      height: '100%',
    },
  });
  const {reservations, studyrooms, buildings} = buildingStore.getState();
  React.useEffect(() => {
    supervisorSdk.getReservations(id);
  }, [id]);
  const formattedDate = (date: string) => {
    console.log(date);
    const newDate = new Date(date);
    return format(newDate, 'dd-MM-yyyy');
  };
  const renderItem = ({item}: Item) => {
    const studyroom = studyrooms?.find(o => o._id === item.studyroom);
    console.log(item);
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
  };
  console.log(reservations);
  return (
    <View style={styles.wrapper}>
      <FlatList data={reservations} renderItem={renderItem} />
    </View>
  );
};
export default ReservationsScreen;
