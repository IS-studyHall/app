import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import Button from '../../atoms/button';
import Input from '../../atoms/input';
import Text from '../../atoms/text';
import {useFormik as useForm} from 'formik';
import theme from '../../../providers/theme/defaultTheme';
import Preview from '../../molecules/preview';
import {supervisorSdk} from '../../../../utils/supervisorSdk';
import {buildingStore} from '../../../../store/module/building';
import SelectOptions from '../../molecules/select-options';
interface AddStudyroomBottomSheet {
  title: string;
}
const AddStudyroomBottomSheet = React.forwardRef<
  BottomSheetModal,
  AddStudyroomBottomSheet
>(({title}, ref): JSX.Element => {
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
    input: {
      marginBottom: sizes.spacings.m,
    },
    button: {
      marginBottom: sizes.spacings.s,
    },
    separator: {
      marginBottom: sizes.spacings.xxl,
    },
    image: {
      alignSelf: 'center',
    },
  });
  // variables
  const snapPoints = React.useMemo(() => ['25%', '100%'], []);
  const buildings = buildingStore.getState().buildings;
  console.log(buildings);
  const handleSheetChanges = React.useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const handleClose = React.useCallback(() => {
    (ref as React.RefObject<BottomSheetModalMethods>).current?.close();
  }, [ref]);
  const form = useForm({
    initialValues: {
      name: '',
      building: '',
      floor: '',
      seats: '',
      image: '',
    },
    onSubmit: async ({name, building, floor, seats, image}) => {
      await supervisorSdk.createStudyroom(name, building, floor, seats, image);
      await supervisorSdk.getStudyrooms();
      handleClose();
    },
  });
  return (
    <BottomSheetModal
      ref={ref}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}>
      <View style={styles.contentContainer}>
        <Text type="h1" style={styles.title}>
          Aggiungi aula studio
        </Text>
        {form.values.image !== '' ? (
          <Preview
            style={[styles.image, styles.input]}
            name={'anteprima'}
            image={form.values.image}
            gradient={false}
          />
        ) : null}
        <Input
          style={styles.input}
          value={form.values.name}
          setValue={form.handleChange('name')}
          placeholder="nome"
        />
        <SelectOptions
          data={buildings}
          selected={form.values.building}
          setSelected={form.handleChange('building')}
          style={styles.input}
        />
        <Input
          style={styles.input}
          value={form.values.floor}
          setValue={form.handleChange('floor')}
          placeholder="piano"
        />
        <Input
          style={styles.input}
          value={form.values.seats}
          setValue={form.handleChange('seats')}
          placeholder="posti totali"
        />
        <Input
          style={styles.separator}
          type="image"
          value={form.values.image}
          setValue={form.handleChange('image')}
        />
        <Button
          style={styles.button}
          title="conferma"
          onPress={form.handleSubmit}
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

export default AddStudyroomBottomSheet;
