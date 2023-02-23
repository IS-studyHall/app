import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import * as React from 'react';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Button from '../../atoms/button';
import Input from '../../atoms/input';
import Text from '../../atoms/text';
import {useFormik as useForm} from 'formik';
import theme from '../../../providers/theme/defaultTheme';
import Preview from '../../molecules/preview';
import {supervisorSdk} from '../../../../utils/supervisorSdk';
import {buildingStore} from '../../../../store/module/building';
import SelectOptions from '../../molecules/select-options';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
const StudyroomSchema = Yup.object().shape({
  name: Yup.string().required('campo richiesto'),
  building: Yup.string().required('campo richiesto'),
  floor: Yup.string()
    .min(1, 'piano non valido')
    .max(1, 'piano non valido')
    .required('campo richiesto'),
  seats: Yup.string()
    .min(1, 'numero posti non valido')
    .max(3, 'numero posti non valido')
    .required('campo richiesto'),
  image: Yup.string().required('campo richiesto'),
});
interface AddStudyroomBottomSheet {
  studyroom?: StudyRoom;
  onSubmit?: () => void;
}
const AddStudyroomBottomSheet = React.forwardRef<
  BottomSheetModal,
  AddStudyroomBottomSheet
>(({studyroom, onSubmit}, ref): JSX.Element => {
  const {sizes, colors} = theme;
  const styles = StyleSheet.create({
    contentContainer: {
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
      marginHorizontal: sizes.spacings.l,
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
  const handleSheetChanges = React.useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const handleClose = React.useCallback(async () => {
    (ref as React.RefObject<BottomSheetModalMethods>).current?.close();
    if (onSubmit) {
      onSubmit();
    }
  }, [onSubmit, ref]);
  const form = useForm({
    initialValues: {
      name: studyroom ? studyroom.name : '',
      building: studyroom ? studyroom.building : '',
      floor: studyroom ? studyroom.floor.toString() : '',
      seats: studyroom?.seats.toString() ?? '',
      image: studyroom ? studyroom.image : '',
    },
    validateOnChange: false,
    validationSchema: StudyroomSchema,
    onSubmit: async ({name, building, floor, seats, image}) => {
      if (studyroom) {
        try {
          await supervisorSdk.updateStudyroom(
            studyroom._id,
            name,
            building,
            floor.toString(),
            seats.toString(),
            image,
          );
          if (onSubmit) {
            onSubmit();
          }
        } catch (e) {
          Toast.show({
            type: 'error',
            text1: 'Campi errati',
            text2: 'Controlla che i campi inseriti siano validi',
          });
        }
      } else {
        const data = await supervisorSdk.createStudyroom(
          name,
          building,
          floor.toString(),
          seats.toString(),
          image,
        );
        if (!data) {
          Toast.show({
            type: 'error',
            text1: 'Aula studio non valida',
            text2: 'Verifica che non hai gia un aula studio con lo stesso nome',
          });
        } else {
          handleClose();
        }
      }
    },
  });
  return (
    <BottomSheetModal
      ref={ref}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
            error={form.errors.name}
            placeholder="nome"
          />
          <SelectOptions
            data={buildings}
            selected={form.values.building}
            setSelected={form.handleChange('building')}
            error={form.errors.building}
            style={styles.input}
          />
          <Input
            style={styles.input}
            value={form.values.floor}
            setValue={form.handleChange('floor')}
            error={form.errors.floor}
            keyboardType="numeric"
            placeholder="piano"
          />
          <Input
            style={styles.input}
            value={form.values.seats}
            setValue={form.handleChange('seats')}
            error={form.errors.seats}
            keyboardType="numeric"
            placeholder="posti totali"
          />
          <Input
            style={styles.separator}
            type="image"
            value={form.values.image}
            setValue={form.handleChange('image')}
            error={form.errors.image}
          />
        </View>
      </TouchableWithoutFeedback>
      <Button
        key="submit"
        style={styles.button}
        title="conferma"
        onPress={form.handleSubmit}
      />
      <Button
        style={styles.button}
        status="primaryOutlined"
        title="annulla"
        onPress={handleClose}
      />
      <Toast position="top" topOffset={10} />
    </BottomSheetModal>
  );
});

export default AddStudyroomBottomSheet;
