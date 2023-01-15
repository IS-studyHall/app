import * as React from 'react';
import {Linking, Pressable, StyleSheet, View, ViewStyle} from 'react-native';
import Card from '../../../../../components/atomics/atoms/card';
import Text from '../../../../../components/atomics/atoms/text';
import theme from '../../../../../components/providers/theme/defaultTheme';
import Icon from 'react-native-vector-icons/AntDesign';
interface Item {
  textLeft: string;
  textRight: string;
  last?: boolean;
}
interface ReservationProps {
  building?: Building;
  studyroom: string;
  date: string;
  start: string;
  end: string;
  style?: ViewStyle;
  footer?: boolean;
  handleDelete?: () => void;
}
const Reservation: React.FC<ReservationProps> = ({
  building,
  studyroom,
  date,
  start,
  end,
  footer = true,
  handleDelete,
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
      bold: {
        fontWeight: 'bold',
      },
    });
    return (
      <View style={stylesItem.wrapper}>
        <Text type="p1">{textLeft}</Text>
        <Text type="p1" style={stylesItem.bold}>
          {textRight}
        </Text>
      </View>
    );
  };
  const handlePosition = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${building?.coords[0].lat},${building?.coords[0].lng}`;
    Linking.openURL(url);
  };
  console.log(building);
  return (
    <Card style={styles.card}>
      <RenderItem
        textLeft="Nome"
        textRight={`Edificio ${building?.name} - ${studyroom}`}
      />
      <RenderItem textLeft="data" textRight={date} last={!footer} />
      <RenderItem
        textLeft="ora"
        textRight={`${start} - ${end}`}
        last={!footer}
      />
      {footer ? (
        <View style={styles.footer}>
          <Pressable onPress={handlePosition} style={{flexDirection: 'row'}}>
            <Icon
              color={colors.secondary.main}
              name="enviromento"
              size={sizes.spacings.m}
              style={{marginRight: sizes.spacings.xs}}
            />
            <Text type="p1" color="secondary">
              Indicazioni
            </Text>
          </Pressable>
          <Pressable onPress={handleDelete} style={{flexDirection: 'row'}}>
            <Icon
              color={colors.danger.main}
              name="delete"
              size={sizes.spacings.m}
              style={{marginRight: sizes.spacings.xs}}
            />
            <Text type="p1" color="danger">
              Elimina
            </Text>
          </Pressable>
        </View>
      ) : (
        <></>
      )}
    </Card>
  );
};
export default Reservation;
