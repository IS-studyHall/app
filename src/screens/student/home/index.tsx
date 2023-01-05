import * as React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Text from '../../../components/atomics/atoms/text';
import theme from '../../../components/providers/theme/defaultTheme';
import Studyroom from '../../../components/atomics/molecules/preview';
import {ParamListBase} from '@react-navigation/native';
import {buildingStore} from '../../../store/module/building';
interface RenderBuilding {
  item: StudyroomsGroupByBuilding;
}
interface renderStudyRoom {
  item: Studyroom;
}

const HomeScreen: ScreenComponentType<ParamListBase, 'Home'> = ({
  navigation,
}): JSX.Element => {
  const {sizes, colors} = theme;
  const styles = StyleSheet.create({
    wrapper: {
      paddingTop: sizes.spacings.l,
      backgroundColor: colors.background.main,
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
  const [studyroomsGroupByBuildings, setstudyroomsGroupByBuildings] =
    React.useState<StudyroomsGroupByBuilding[]>();
  const [buildings, setBuildings] = React.useState<Building[]>();
  buildingStore.subscribe(() => {
    setstudyroomsGroupByBuildings(
      buildingStore.getState().studyroomsGroupByBuildings,
    );
    const b = buildingStore.getState().buildings;
    console.log(b);
    setBuildings(b);
  });
  const renderStudyRoom = ({item}: renderStudyRoom) => {
    const handlePress = () => {
      navigation.navigate('studyroom', {id: item._id});
    };
    console.log('IMAGE:', item.image);
    return (
      <Studyroom
        key={item._id}
        name={item.name}
        image={item.image}
        style={styles.studyRoom}
        onPress={handlePress}
      />
    );
  };
  const renderBuilding = ({item}: RenderBuilding) => {
    return (
      <View>
        <Text style={styles.text} type="h1" color="secondary">
          {`Edificio ${buildings?.find(b => b._id === item._id)?.name}`}
        </Text>
        <FlatList
          style={styles.building}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={item.studyrooms}
          renderItem={renderStudyRoom}
        />
      </View>
    );
  };
  console.log(studyroomsGroupByBuildings, buildings);
  return (
    <FlatList
      keyExtractor={o => o._id}
      style={styles.wrapper}
      data={studyroomsGroupByBuildings}
      renderItem={renderBuilding}
    />
  );
};
export default HomeScreen;
