import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import StudentNavigation from './student';
import SupervisorNavigation from './supervisor';
import UnloggedNavigation from './unlogged';
import {store} from '../../../../store/module/auth';

const NavigationProvider = (): JSX.Element => {
  const [logged, setLogged] = React.useState<boolean>();
  const [supervisor, setSupervisor] = React.useState<boolean>();
  store.subscribe(() => {
    const state = store.getState();
    setLogged(state.logged);
    setSupervisor(state.supervisor);
  });
  const content = React.useMemo(() => {
    return logged ? (
      supervisor ? (
        <SupervisorNavigation />
      ) : (
        <StudentNavigation />
      )
    ) : (
      <UnloggedNavigation />
    );
  }, [logged, supervisor]);
  return <NavigationContainer>{content}</NavigationContainer>;
};

export default NavigationProvider;
