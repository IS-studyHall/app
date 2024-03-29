import * as React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import theme from '../../../components/providers/theme/defaultTheme';
import Studyroom from '../../../components/atomics/molecules/preview';
import {ParamListBase} from '@react-navigation/native';
import {buildingStore} from '../../../store/module/building';
import {supervisorSdk} from '../../../utils/supervisorSdk';
import Text from '../../../components/atomics/atoms/text';
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
    desc: {
      textAlign: 'center',
      marginTop: sizes.spacings.l,
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
      navigation.navigate('studyroom', {id: item._id});
    };
    return (
      <Studyroom
        key={item._id}
        name={item.name}
        image={item.image}
        style={styles.separator}
        onPress={handlePress}
      />
    );
  };
  return (
    <View>
      {studyrooms?.length === 0 ? (
        <Text style={styles.desc} type="p1">
          Non sono presenti aule studio
        </Text>
      ) : (
        <FlatList
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          style={styles.wrapper}
          contentContainerStyle={styles.content}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          data={studyrooms}
          keyExtractor={item => item._id}
          renderItem={renderStudyRoom}
        />
      )}
    </View>
  );
};
export default HomeScreen;
