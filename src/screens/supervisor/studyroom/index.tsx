import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {ParamListBase} from '@react-navigation/native';
import Preview from '../../../components/atomics/molecules/preview';
import theme from '../../../components/providers/theme/defaultTheme';
import {FlatList} from 'react-native-gesture-handler';
import Button from '../../../components/atomics/atoms/button';
import {supervisorSdk} from '../../../utils/supervisorSdk';
import {buildingStore} from '../../../store/module/building';
import VerifyBottomSheet from '../../../components/atomics/organisms/confirm-bottomsheet';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
interface Item {
  item: any;
  index: number;
}
const StudyroomScreen: ScreenComponentType<ParamListBase, 'Studyroom'> = ({
  route,
  navigation,
}) => {
  const {sizes, colors} = theme;
  const {id} = route.params;
  const styles = StyleSheet.create({
    wrapper: {
      backgroundColor: colors.background.main,
      paddingHorizontal: sizes.spacings.l,
    },
    preview: {
      height: 250,
      paddingVertical: sizes.spacings.l,
    },
    button: {
      flex: 1,
      marginTop: sizes.spacings.s,
    },
    timeRange: {
      flex: 1,
      marginHorizontal: sizes.spacings.s,
    },
    separator: {
      width: sizes.spacings.s,
      height: sizes.spacings.s,
    },
    list: {
      paddingBottom: 2 * sizes.spacings.xxl,
    },
    item: {
      flex: 1,
      marginHorizontal: sizes.spacings.xs,
    },
  });
  React.useEffect(() => {
    const getStudyroom = async () => {
      await supervisorSdk.getStudyroom(id);
    };
    getStudyroom();
  }, [id]);
  const [studyroom, setStudyroom] = React.useState<StudyRoom>();
  const changeStatusRef = React.useRef<BottomSheetModal>(null);
  const deleteRef = React.useRef<BottomSheetModal>(null);
  buildingStore.subscribe(() => {
    const state = buildingStore.getState();
    setStudyroom(state.studyroom);
  });
  const buttons = React.useMemo(() => {
    const handleDisable = async () => {
      changeStatusRef.current?.present();
    };
    const handleReservations = () => console.log('reservations');
    const handleDelete = async () => {
      deleteRef.current?.present();
    };
    const handleUpdate = () => console.log('update');
    return [
      {
        name: studyroom?.isactive ? 'Sospendi' : 'Attiva',
        color: 'secondary',
        func: handleDisable,
      },
      {
        name: 'Lista Prenotazioni',
        color: 'primary',
        func: handleReservations,
      },
      {
        name: 'Elimina',
        color: 'primary',
        func: handleDelete,
      },
      {
        name: 'Modifica',
        color: 'secondary',
        func: handleUpdate,
      },
    ];
  }, [studyroom?.isactive]);
  const renderItem = ({item}: Item) => {
    return (
      <View style={styles.item}>
        <Button
          status={item.color}
          style={styles.button}
          title={item.name}
          onPress={item.func}
        />
      </View>
    );
  };
  const building = React.useMemo(() => {
    const buildings = buildingStore.getState().buildings;
    return buildings.find(o => o._id === studyroom?.building);
  }, [studyroom?.building]);
  return studyroom ? (
    <View style={styles.wrapper}>
      <View style={styles.preview}>
        <Preview
          name={studyroom.name}
          building={`Edificio ${building?.name}`}
          image={studyroom.image}
          adaptToContent
          gradient
          active={studyroom.isactive}
        />
      </View>
      <FlatList
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        scrollEnabled={false}
        numColumns={2}
        renderItem={renderItem}
        data={buttons}
      />
      <VerifyBottomSheet
        ref={changeStatusRef}
        title="Verifica"
        subtitle={`sicuro di voler ${
          studyroom.isactive ? 'sospendere' : 'attivare'
        } l'aula studio?`}
        confirm={async () => {
          await supervisorSdk.changeStatusStudyroom(id);
          await supervisorSdk.getStudyroom(id);
        }}
      />
      <VerifyBottomSheet
        ref={deleteRef}
        title="Verifica"
        subtitle="sicuro di voler eliminare l'aula studio?"
        confirm={async () => {
          await supervisorSdk.deleteStudyroom(id);
          await supervisorSdk.getStudyrooms();
          navigation.goBack();
        }}
      />
    </View>
  ) : (
    <View />
  );
};
export default StudyroomScreen;
