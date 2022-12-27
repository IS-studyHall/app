import * as React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Text from '../../../components/atomics/atoms/text';
import theme from '../../../components/providers/theme/defaultTheme';
import Reservation from './components/reservation';
import {active, expired} from './data';
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
  return (
    <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
      <Text type="h1" style={styles.text}>
        Attivo
      </Text>
      {active.map(item => (
        <Reservation
          key={item.key}
          building={item.building}
          studyroom={item.studyroom}
          date={item.date}
          start={item.start}
          end={item.end}
          lat={item.lat}
          lng={item.lng}
        />
      ))}
      <Text type="h1" style={styles.text}>
        Scaduto
      </Text>
      {expired.map(item => (
        <Reservation
          key={item.key}
          building={item.building}
          studyroom={item.studyroom}
          date={item.date}
          start={item.start}
          end={item.end}
          lat={item.lat}
          lng={item.lng}
        />
      ))}
      <View style={styles.divider} />
    </ScrollView>
  );
};
export default ReservationScreen;
