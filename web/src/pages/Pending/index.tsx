import React, { useEffect, useMemo, useState } from 'react';
import { Marker, TileLayer } from 'react-leaflet';
import { FiCheck } from 'react-icons/fi';
import api from '../../services/api';
import SidebarDashboard from '../../components/SidebarDashboard';
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

const Pending: React.FC = () => {
  const [orphanages, setOrphanages] = useState<OrphanageProps[]>([]);
  useEffect(() => {
    api.get('pending').then(response => setOrphanages(response.data));
  }, []);

  async function onHandleApprove(id: number) {
    await api.put(`orphanages/${id}`, {});
    setOrphanages(state => state.filter(orphanage => orphanage.id !== id));
  }

  const numberOfOrphanagesFound = useMemo(() => {
    const orphanagesString = orphanages.length > 1 ? 'orfanatos' : 'orfanato';
    return `${orphanages.length} ${orphanagesString}`;
  }, [orphanages]);

  return (
    <Container>
      <SidebarDashboard />
      <DashboardContainer>
        <DashboardHeader>
          <h1>Cadastros pendentes</h1>
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
                    <button
                      type='button'
                      onClick={() => onHandleApprove(orphanage.id)}
                    >
                      <FiCheck size={24} />
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

export default Pending;
