import * as React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Button from '../../../components/atomics/atoms/button';
import Text from '../../../components/atomics/atoms/text';
import theme from '../../../components/providers/theme/defaultTheme';
import Studyroom from './components/studyroom';
import {content} from './data';
interface RenderBuilding {
  item: Building;
}
interface renderStudyRoom {
  item: Studyroom;
}
const HomeScreen = (): JSX.Element => {
  const {sizes} = theme;
  const styles = StyleSheet.create({
    wrapper: {
      paddingTop: sizes.spacings.l,
    },
    building: {
      marginBottom: sizes.spacings.xl,
    },
    text: {
      marginLeft: sizes.spacings.m,
      textTransform: 'capitalize',
      marginBottom: sizes.spacings.s,
    },
    studyRoom: {
      marginLeft: sizes.spacings.m,
    },
  });
  const renderStudyRoom = ({item}: renderStudyRoom) => {
    return (
      <Studyroom
        key={item.key}
        name={item.name}
        image={item.image}
        style={styles.studyRoom}
      />
    );
  };
  const renderBuilding = ({item}: RenderBuilding) => {
    return (
      <View>
        <Text style={styles.text} type="h1" color="secondary">
          {item.name}
        </Text>
        <FlatList
          style={styles.building}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={item.studyroom}
          renderItem={renderStudyRoom}
        />
      </View>
    );
  };
  return (
    <View>
      <FlatList
        style={styles.wrapper}
        data={content}
        renderItem={renderBuilding}
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
