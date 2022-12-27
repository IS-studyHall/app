import * as React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Text from '../../../components/atomics/atoms/text';
import theme from '../../../components/providers/theme/defaultTheme';
import Studyroom from '../../../components/atomics/molecules/preview';
import {content} from './data';
import {StackHeaderProps} from '@react-navigation/stack';
interface RenderBuilding {
  item: Building;
}
interface renderStudyRoom {
  item: Studyroom;
}
const HomeScreen: React.FC<StackHeaderProps> = ({navigation}): JSX.Element => {
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
  const renderStudyRoom = ({item}: renderStudyRoom) => {
    const handlePress = () => {
      navigation.navigate('studyroom');
    };
    return (
      <Studyroom
        key={item.key}
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
    <FlatList
      style={styles.wrapper}
      data={content}
      renderItem={renderBuilding}
    />
  );
};
export default HomeScreen;
