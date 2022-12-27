import * as React from 'react';
import {Linking, Pressable, StyleSheet, View, ViewStyle} from 'react-native';
import Card from '../../../../../components/atomics/atoms/card';
import Text from '../../../../../components/atomics/atoms/text';
import theme from '../../../../../components/providers/theme/defaultTheme';
interface Item {
  textLeft: string;
  textRight: string;
  last?: boolean;
}
interface ReservationProps {
  key: string;
  building: string;
  studyroom: string;
  date: string;
  start: string;
  end: string;
  lat: string;
  lng: string;
  style?: ViewStyle;
}
const Reservation: React.FC<ReservationProps> = ({
  building,
  studyroom,
  date,
  start,
  end,
  lat,
  lng,
}) => {
  const {sizes, colors} = theme;
  const styles = StyleSheet.create({
    wrapper: {
      marginHorizontal: sizes.spacings.l,
      marginVertical: sizes.spacings.xl,
    },
    text: {
      marginBottom: sizes.spacings.m,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: sizes.spacings.s,
      paddingBottom: sizes.spacings.s,
    },
    card: {
      marginBottom: sizes.spacings.l,
    },
  });
  const RenderItem = ({textLeft, textRight, last}: Item): JSX.Element => {
    const stylesItem = StyleSheet.create({
      wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: sizes.spacings.s,
        paddingBottom: sizes.spacings.s,
        borderBottomWidth: last ? 0 : 0.5,
        borderBottomColor: colors.divider,
      },
    });
    return (
      <View style={stylesItem.wrapper}>
        <Text type="p1">{textLeft}</Text>
        <Text type="p1">{textRight}</Text>
      </View>
    );
  };
  const handlePosition = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    Linking.openURL(url);
  };
  const handleDelete = () => {};
  return (
    <Card style={styles.card}>
      <RenderItem textLeft="Nome" textRight={`${building} ${studyroom}`} />
      <RenderItem
        textLeft="data e ora"
        textRight={`${start} - ${end} ${date}`}
      />
      <View style={styles.footer}>
        <Pressable onPress={handlePosition}>
          <Text type="p1">Indicazioni</Text>
        </Pressable>
        <Pressable onPress={handleDelete}>
          <Text type="p1">Elimina</Text>
        </Pressable>
      </View>
    </Card>
  );
};
export default Reservation;
