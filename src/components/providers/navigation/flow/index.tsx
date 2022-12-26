import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import MainNavigation from './main';
import UnloggedNavigation from './unlogged';

const NavigationProvider = (): JSX.Element => {
  const logged = true;
  const content = React.useMemo(() => {
    return logged ? <MainNavigation /> : <UnloggedNavigation />;
  }, [logged]);
  return <NavigationContainer>{content}</NavigationContainer>;
};

export default NavigationProvider;
