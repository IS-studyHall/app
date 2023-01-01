import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from '../../atoms/text';
import theme from '../../../providers/theme/defaultTheme';
import Button from '../../atoms/button';
interface VerifyBottomSheet {
  title: string;
  subtitle: string;
  confirm: () => void;
}
const VerifyBottomSheet = React.forwardRef<BottomSheetModal, VerifyBottomSheet>(
  ({title, subtitle, confirm}, ref): JSX.Element => {
    const {sizes, colors} = theme;
    title;
    const styles = StyleSheet.create({
      modal: {
        borderWidth: 1,
        borderColor: colors.divider,
        borderRadius: sizes.borderRadius.big,
      },
      contentContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
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
    const snapPoints = React.useMemo(() => ['25%', '40%'], []);
    const handleSheetChanges = React.useCallback((index: number) => {
      console.log('handleSheetChanges', index);
    }, []);
    const handleClose = React.useCallback(() => {
      (ref as React.RefObject<BottomSheetModalMethods>).current?.close();
    }, [ref]);
    const handleConfirm = React.useCallback(() => {
      confirm();
      (ref as React.RefObject<BottomSheetModalMethods>).current?.close();
    }, [confirm, ref]);
    return (
      <BottomSheetModal
        ref={ref}
        index={1}
        style={styles.modal}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <View style={styles.contentContainer}>
          <View>
            <Text type="h1" style={styles.title}>
              Conferma
            </Text>
            <Text type="h3" style={styles.title}>
              {subtitle}
            </Text>
          </View>
          <View>
            <Button
              style={styles.dividier}
              title="Si"
              onPress={handleConfirm}
            />
            <Button status="primaryOutlined" title="No" onPress={handleClose} />
          </View>
        </View>
      </BottomSheetModal>
    );
  },
);

export default VerifyBottomSheet;
