import * as React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import theme from '../../../components/providers/theme/defaultTheme';
import Studyroom from '../../../components/atomics/molecules/preview';
import {ParamListBase} from '@react-navigation/native';
import {buildingStore} from '../../../store/module/building';
import {supervisorSdk} from '../../../utils/supervisorSdk';
interface renderStudyRoom {
  item: Studyroom;
}
const HomeScreen: ScreenComponentType<ParamListBase, 'Home'> = ({
  navigation,
}): JSX.Element => {
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
  React.useEffect(() => {
    const getStudyrooms = async () => {
      await supervisorSdk.getStudyrooms();
    };
    getStudyrooms();
  }, []);
  const [studyrooms, setStudyrooms] = React.useState<StudyRoom[]>();
  buildingStore.subscribe(() => {
    const state = buildingStore.getState();
    setStudyrooms(state.studyrooms);
  });
  const renderStudyRoom = ({item}: renderStudyRoom) => {
    const handlePress = () => {
      navigation.navigate('studyroom', {id: item._id, title: item.name});
    };
    return (
      <Studyroom
        key={item.key}
        name={item.name}
        image={item.image}
        style={styles.separator}
        onPress={handlePress}
      />
    );
  };
  return (
    <View>
      <FlatList
        scrollEnabled={false}
        style={styles.wrapper}
        contentContainerStyle={styles.content}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        data={studyrooms}
        keyExtractor={item => item._id}
        renderItem={renderStudyRoom}
      />
    </View>
  );
};
export default HomeScreen;
