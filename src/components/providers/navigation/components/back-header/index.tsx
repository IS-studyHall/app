import {StackHeaderProps} from '@react-navigation/stack';
import * as React from 'react';
import {Platform, Pressable, StyleSheet, View} from 'react-native';
import Text from '../../../../atomics/atoms/text';
import theme from '../../../theme/defaultTheme';
interface BackHeaderProps extends StackHeaderProps {
  title?: string;
}
const BackHeader: React.FC<BackHeaderProps> = ({navigation, route, title}) => {
  const {colors, sizes} = theme;
  const styles = StyleSheet.create({
    wrapper: {
      width: '100%',
      height: Platform.OS === 'ios' ? 80 : 50,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      alignContent: 'center',
      alignSelf: 'center',
      backgroundColor: colors.primary.main,
      //paddingBottom: ,
      paddingHorizontal: sizes.spacings.m,
    },
    item: {
      padding: sizes.spacings.m,
      width: '33.33%',
      height: 'auto',
      textAlign: 'center',
    },
  });
  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.wrapper}>
      <Pressable style={styles.item} onPress={handleBack}>
        <Text type={'p1'} color="light">
          indietro
        </Text>
      </Pressable>
      <Text style={styles.item} type="h3" color="light">
        {title ?? (route.params as {title: string} | undefined)?.title ?? ''}
      </Text>
      <View style={styles.item} />
    </View>
  );
};
export default BackHeader;
