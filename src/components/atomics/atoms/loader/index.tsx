import * as React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import theme from '../../../providers/theme/defaultTheme';
interface LoaderProps {
  status?: 'default' | 'light';
}
const Loader: React.FC<LoaderProps> = ({status}) => {
  const {colors} = theme;
  const styles = StyleSheet.create({
    indicator: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
  });
  const color = React.useMemo(() => {
    switch (status) {
      case 'light':
        return colors.base.white;
      default:
        return colors.secondary.main;
    }
  }, [colors.base.white, colors.secondary.main, status]);
  return (
    <View style={styles.indicator}>
      <ActivityIndicator color={color} />
    </View>
  );
};
export default Loader;
