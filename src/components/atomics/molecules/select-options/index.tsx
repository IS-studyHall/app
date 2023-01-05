import {BottomSheetModal} from '@gorhom/bottom-sheet';
import * as React from 'react';
import {Keyboard, Pressable, StyleSheet, View, ViewStyle} from 'react-native';
import theme from '../../../providers/theme/defaultTheme';
import Text from '../../atoms/text';
import OptionsBottomSheet from '../../organisms/options-bottomsheet';
interface SelectOptionsProps {
  data: Data[];
  selected?: string;
  setSelected: (e: any) => void;
  style?: ViewStyle;
}
interface Data {
  _id: string;
  name: string;
}
const SelectOptions: React.FC<SelectOptionsProps> = ({
  data,
  style,
  selected,
  setSelected,
}) => {
  const {colors, sizes} = theme;
  const styles = StyleSheet.create({
    wrapper: {
      borderColor: colors.divider,
      borderWidth: 1,
      borderRadius: sizes.borderRadius.extraSmall,
      paddingVertical: 2 * sizes.spacings.xs,
      paddingLeft: sizes.spacings.xs,
    },
  });
  const bottomSheetRef = React.useRef<BottomSheetModal>(null);
  const handleChooseBuildings = () => {
    Keyboard.dismiss();
    console.log('keyboard dismiss');
    bottomSheetRef.current?.present();
  };
  const building = React.useMemo(() => {
    return data.find(o => o._id === selected);
  }, [data, selected]);
  return (
    <View style={style}>
      <Pressable onPress={handleChooseBuildings}>
        <View style={styles.wrapper}>
          <Text type="p1" color={building ? 'title' : 'hint'}>
            {!building ? 'edificio' : building.name}
          </Text>
        </View>
      </Pressable>
      <OptionsBottomSheet
        ref={bottomSheetRef}
        title="Edifici"
        data={data}
        selected={selected}
        setSelected={setSelected}
      />
    </View>
  );
};
export default SelectOptions;
