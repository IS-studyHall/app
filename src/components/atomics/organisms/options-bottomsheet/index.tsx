import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import * as React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Text from '../../atoms/text';
import theme from '../../../providers/theme/defaultTheme';
import Button from '../../atoms/button';
import {FlatList} from 'react-native-gesture-handler';
interface OptionsBottomSheet {
  title: string;
  selected?: string;
  setSelected: (e: any) => void;
  data: Data[];
}
interface Item {
  item: Data;
}
interface Data {
  _id: string;
  name: string;
}
const OptionsBottomSheet = React.forwardRef<
  BottomSheetModal,
  OptionsBottomSheet
>(({title, data, selected, setSelected}, ref): JSX.Element => {
  const {sizes, colors} = theme;
  title;
  const styles = StyleSheet.create({
    contentContainer: {
      flex: 1,
      paddingHorizontal: sizes.spacings.l,
      paddingVertical: sizes.spacings.xxl,
      backgroundColor: colors.background.main,
    },
    title: {
      marginBottom: sizes.spacings.l,
    },
    dividier: {
      marginVertical: sizes.spacings.s,
    },
  });
  // variables
  const snapPoints = React.useMemo(() => ['25%', '100%'], []);
  const handleSheetChanges = React.useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const handleClose = React.useCallback(() => {
    (ref as React.RefObject<BottomSheetModalMethods>).current?.close();
  }, [ref]);
  const renderItem = ({item}: Item) => {
    const itemStyles = StyleSheet.create({
      wrapper: {
        flexDirection: 'row',
        backgroundColor:
          selected === item._id ? colors.secondary.main : 'transparent',
        borderRadius: sizes.borderRadius.small,
        paddingVertical: sizes.spacings.s,
        justifyContent: 'center',
      },
    });
    return (
      <Pressable
        style={itemStyles.wrapper}
        onPress={() => setSelected(item._id)}>
        <Text type="h3">{`Edificio ${item.name}`}</Text>
      </Pressable>
    );
  };
  return (
    <BottomSheetModal
      ref={ref}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}>
      <View style={styles.contentContainer}>
        <Text type="h1" style={styles.title}>
          Seleziona
        </Text>
        <FlatList data={data} renderItem={renderItem} />
        <Button
          style={styles.dividier}
          title="seleziona"
          onPress={handleClose}
        />
        <Button
          status="primaryOutlined"
          title="annulla"
          onPress={handleClose}
        />
      </View>
    </BottomSheetModal>
  );
});

export default OptionsBottomSheet;
