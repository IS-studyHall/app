import * as React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Button from '../../../components/atomics/atoms/button';
import theme from '../../../components/providers/theme/defaultTheme';
import Studyroom from '../../../components/atomics/molecules/preview';
import {content} from './data';
interface renderStudyRoom {
  item: Studyroom;
}
const HomeScreen = (): JSX.Element => {
  const {sizes} = theme;
  const styles = StyleSheet.create({
    wrapper: {
      paddingTop: sizes.spacings.l,
    },
    content: {
      flexDirection: 'column',
      alignItems: 'center',
      paddingBottom: 2 * sizes.spacings.xl,
    },
    text: {
      marginLeft: sizes.spacings.m,
      textTransform: 'capitalize',
      marginBottom: sizes.spacings.s,
    },
    separator: {
      marginBottom: sizes.spacings.s,
    },
  });
  const renderStudyRoom = ({item}: renderStudyRoom) => {
    return (
      <Studyroom
        key={item.key}
        name={item.name}
        image={item.image}
        style={styles.separator}
      />
    );
  };
  return (
    <View>
      <FlatList
        style={styles.wrapper}
        contentContainerStyle={styles.content}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        data={content}
        renderItem={renderStudyRoom}
      />
      <Button
        title={'+'}
        onPress={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </View>
  );
};
export default HomeScreen;
