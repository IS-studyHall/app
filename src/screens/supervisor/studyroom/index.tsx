import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {ParamListBase} from '@react-navigation/native';
import Preview from '../../../components/atomics/molecules/preview';
import {content} from './data';
import theme from '../../../components/providers/theme/defaultTheme';
import {FlatList} from 'react-native-gesture-handler';
import Button from '../../../components/atomics/atoms/button';
interface Item {
  item: any;
  index: number;
}
const StudyroomScreen: ScreenComponentType<ParamListBase, 'Studyroom'> = () => {
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
      flex: 1,
      marginTop: sizes.spacings.s,
    },
    timeRange: {
      flex: 1,
      marginHorizontal: sizes.spacings.s,
    },
    separator: {
      width: sizes.spacings.s,
      height: sizes.spacings.s,
    },
    list: {
      paddingBottom: 2 * sizes.spacings.xxl,
    },
    item: {
      flex: 1,
      marginHorizontal: sizes.spacings.xs,
    },
  });
  const handleDisable = () => console.log('disable');
  const handleReservations = () => console.log('reservations');
  const handleDelete = () => console.log('delete');
  const handleUpdate = () => console.log('update');
  const buttons = [
    {
      name: 'Sospensione',
      color: 'secondary',
      func: handleDisable,
    },
    {
      name: 'lista prenotazioni',
      color: 'primary',
      func: handleReservations,
    },
    {
      name: 'cancellazione',
      color: 'primary',
      func: handleDelete,
    },
    {
      name: 'modifica',
      color: 'secondary',
      func: handleUpdate,
    },
  ];
  const renderItem = ({item}: Item) => {
    return (
      <View style={styles.item}>
        <Button
          status={item.color}
          style={styles.button}
          title={item.name}
          onPress={item.func}
        />
      </View>
    );
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.preview}>
        <Preview
          name={content.name}
          building={content.building}
          image={content.image}
          adaptToContent
          gradient
          active
        />
      </View>
      <FlatList
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        scrollEnabled={false}
        numColumns={2}
        renderItem={renderItem}
        data={buttons}
      />
    </View>
  );
};
export default StudyroomScreen;
