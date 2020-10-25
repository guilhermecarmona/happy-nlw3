import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import OrphanagesMap from './pages/OrphanagesMap';
import OrphanageDetails from './pages/OrphanageDetails';
import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition';
import OrphanageData from './pages/CreateOrphanage/OrphanageData';
import Header from './components/Header';
import Onboarding from './pages/Onboarding';
import Intro from './pages/Intro';
import OrphanageVisitInfo from './pages/CreateOrphanage/OrphanageVisitInfo';
import CancelCreation from './pages/CreateOrphanage/CancelCreation';
import OrphanageCreated from './pages/CreateOrphanage/OrphanageCreated';

const { Navigator, Screen } = createStackNavigator();

const Routes: React.FC<{ isFirstAccess: boolean }> = ({ isFirstAccess }) => {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#f2f3f5' },
        }}
      >
        {isFirstAccess && <Screen name='Onboarding' component={Onboarding} />}
        {isFirstAccess && <Screen name='Intro' component={Intro} />}
        <Screen name='OrphanagesMap' component={OrphanagesMap} />
        <Screen
          name='OrphanageDetails'
          component={OrphanageDetails}
          options={{
            headerShown: true,
            header: () => <Header showCancel={false} title='Orfanato' />,
          }}
        />
        <Screen
          name='SelectMapPosition'
          component={SelectMapPosition}
          options={{
            headerShown: true,
            header: () => <Header title='Selecione no mapa' />,
          }}
        />
        <Screen
          name='OrphanageData'
          component={OrphanageData}
          options={{
            headerShown: true,
            header: () => <Header title='Informe os dados' />,
          }}
        />
        <Screen
          name='OrphanageVisitInfo'
          component={OrphanageVisitInfo}
          options={{
            headerShown: true,
            header: () => <Header title='Informe os dados' />,
          }}
        />
        <Screen
          name='CancelCreation'
          component={CancelCreation}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name='OrphanageCreated'
          component={OrphanageCreated}
          options={{
            headerShown: false,
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default Routes;
