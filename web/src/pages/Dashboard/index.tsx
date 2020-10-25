import React, { useEffect, useMemo, useState } from 'react';
import { Marker, TileLayer } from 'react-leaflet';
import SidebarDashboard from '../../components/SidebarDashboard';
import api from '../../services/api';
import { OrphanageProps } from '../Orphanage';

import mapIcon from '../../utils/mapIcon';
import notFoundImg from '../../assets/images/not-found.svg';

import {
  Container,
  DashboardContainer,
  DashboardHeader,
  NoOrphanage,
  OrphanagesList,
  OrphanageCard,
  StyledMap,
  CardFooter,
  Buttons,
} from './styles';
import { FiEdit3, FiTrash } from 'react-icons/fi';

const Dashboard: React.FC = () => {
  const [orphanages, setOrphanages] = useState<OrphanageProps[]>([]);
  useEffect(() => {
    api.get('orphanages').then(response => setOrphanages(response.data));
  }, []);

  const numberOfOrphanagesFound = useMemo(() => {
    const orphanagesString = orphanages.length > 1 ? 'orfanatos' : 'orfanato';
    return `${orphanages.length} ${orphanagesString}`;
  }, [orphanages]);

  return (
    <Container>
      <SidebarDashboard />
      <DashboardContainer>
        <DashboardHeader>
          <h1>Orfanatos cadastrados</h1>
          {orphanages.length > 0 && <p>{numberOfOrphanagesFound}</p>}
        </DashboardHeader>
        {orphanages.length === 0 ? (
          <NoOrphanage>
            <img src={notFoundImg} alt='Nenhum orfanato' />
            <p>Nenhum no momento</p>
          </NoOrphanage>
        ) : (
          <OrphanagesList>
            {orphanages.map(orphanage => (
              <OrphanageCard key={orphanage.id}>
                <StyledMap
                  center={[orphanage.latitude, orphanage.longitude]}
                  zoom={16}
                  dragging={false}
                  touchZoom={false}
                  zoomControl={false}
                  scrollWheelZoom={false}
                  doubleClickZoom={false}
                >
                  <TileLayer
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                  />
                  <Marker
                    position={[orphanage.latitude, orphanage.longitude]}
                    icon={mapIcon}
                  ></Marker>
                </StyledMap>
                <CardFooter>
                  <p>{orphanage.name}</p>
                  <Buttons>
                    <button type='button'>
                      <FiEdit3 size={24} />
                    </button>
                    <button type='button'>
                      <FiTrash size={24} />
                    </button>
                  </Buttons>
                </CardFooter>
              </OrphanageCard>
            ))}
          </OrphanagesList>
        )}
      </DashboardContainer>
    </Container>
  );
};

export default Dashboard;
