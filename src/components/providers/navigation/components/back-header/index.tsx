import {StackHeaderProps} from '@react-navigation/stack';
import * as React from 'react';
import {Image, Platform, Pressable, StyleSheet, View} from 'react-native';
import Text from '../../../../atomics/atoms/text';
import theme from '../../../theme/defaultTheme';
interface BackHeaderProps extends StackHeaderProps {
  title?: string;
}
const BackHeader: React.FC<BackHeaderProps> = ({navigation, route, title}) => {
  const {colors, sizes} = theme;
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background.main,
    },
    wrapper: {
      width: '100%',
      height: Platform.OS === 'ios' ? 80 : 60,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      alignContent: 'center',
      alignSelf: 'center',
      backgroundColor: colors.primary.main,
      paddingHorizontal: sizes.spacings.m,
      marginBottom: sizes.spacings.s,
    },
    item: {
      padding: sizes.spacings.m,
      width: 'auto',
      height: 'auto',
      textAlign: 'center',
    },
    side: {
      padding: sizes.spacings.m,
      width: '30%',
      height: 'auto',
      textAlign: 'center',
    },
    index: {
      position: 'absolute',
      top: 0,
      right: 1.5 * sizes.spacings.xxl,
    },
  });
  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Pressable style={styles.side} onPress={handleBack}>
          <Text type={'p1'} color="light">
            indietro
          </Text>
        </Pressable>
        <Text style={styles.item} type="h3" color="light">
          {title ?? (route.params as {title: string} | undefined)?.title ?? ''}
        </Text>
        <View style={styles.side} />
      </View>
      <Image
        style={styles.index}
        source={require('../../../../../assets/images/index.png')}
      />
    </View>
  );
};
export default BackHeader;
