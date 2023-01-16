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
    desc: {
      textAlign: 'center',
      marginTop: sizes.spacings.l,
    },
  });
  const [studyroomsGroupByBuildings, setstudyroomsGroupByBuildings] =
    React.useState<StudyroomsGroupByBuilding[]>();
  const [buildings, setBuildings] = React.useState<Building[]>();
  const [favorites, setFavorites] = React.useState<Favorite[]>();
  buildingStore.subscribe(() => {
    const {
      studyroomsGroupByBuildings: studyroomsState,
      favorites: favoritesState,
      buildings: buildingsState,
    } = buildingStore.getState();
    setstudyroomsGroupByBuildings(studyroomsState);
    setBuildings(buildingsState);
    setFavorites(favoritesState);
  });
  const renderStudyRoom = ({item}: renderStudyRoom) => {
    const handlePress = () => {
      navigation.navigate('studyroom', {id: item._id, title: item.name});
    };
    return (
      <Studyroom
        key={item._id}
        name={item.name}
        image={item.image}
        style={styles.studyRoom}
        favoriteState={
          favorites
            ? favorites.findIndex(o => o.studyroom === item._id) > -1
            : undefined
        }
        onPress={handlePress}
      />
    );
  };
  const renderBuilding = ({item}: RenderBuilding) => {
    console.log('item', item);
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
  return studyroomsGroupByBuildings && studyroomsGroupByBuildings.length > 0 ? (
    <FlatList
      keyExtractor={o => o._id}
      style={styles.wrapper}
      data={studyroomsGroupByBuildings}
      renderItem={renderBuilding}
    />
  ) : (
    <Text style={styles.desc} type="p1">
      Non sono presenti aule studio
    </Text>
  );
};
export default HomeScreen;
