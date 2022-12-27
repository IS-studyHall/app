import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import StudentNavigation from './student';
import SupervisorNavigation from './supervisor';
import UnloggedNavigation from './unlogged';

const NavigationProvider = (): JSX.Element => {
  const logged = true;
  const supervisor = false;
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
