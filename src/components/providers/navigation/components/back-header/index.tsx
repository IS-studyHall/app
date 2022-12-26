import {StackHeaderProps} from '@react-navigation/stack';
import * as React from 'react';
import {Platform, Pressable, StyleSheet, View} from 'react-native';
import Text from '../../../../atomics/atoms/text';
import theme from '../../../theme/defaultTheme';

const BackHeader: React.FC<StackHeaderProps> = ({navigation, route}) => {
  const {colors, sizes} = theme;
  const styles = StyleSheet.create({
    wrapper: {
      width: '100%',
      height: Platform.OS === 'ios' ? 80 : 50,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      backgroundColor: colors.primary.main,
      paddingBottom: sizes.spacings.m,
      paddingHorizontal: sizes.spacings.m,
    },
    item: {
      width: '33.33%',
      textAlign: 'center',
    },
  });
  const handleBack = () => {
    navigation.goBack();
  };
  console.log(navigation);
  return (
    <View style={styles.wrapper}>
      <Pressable style={styles.item} onPress={handleBack}>
        <Text type={'p1'} color="light">
          indietro
        </Text>
      </Pressable>
      <Text style={styles.item} type="h3" color="light">
        {(route.params as {title: string} | undefined)?.title ?? ''}
      </Text>
      <View style={styles.item} />
    </View>
  );
};
export default BackHeader;
