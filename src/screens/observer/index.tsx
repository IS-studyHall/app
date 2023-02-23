import * as React from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {observer} from '../../utils/observer';
interface ObservedScreenProps {
  screenId: string;
  children: JSX.Element;
}
const ObservedScreen: React.FC<ObservedScreenProps> = ({
  screenId,
  children,
}) => {
  useFocusEffect(
    React.useCallback(() => {
      observer.notify(screenId, new Date(), 'ENTER');

      return () => observer.notify(screenId, new Date(), 'EXIT');
    }, [screenId]),
  );
  return <>{children}</>;
};

export default ObservedScreen;
