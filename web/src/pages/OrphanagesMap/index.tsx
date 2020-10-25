import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { TileLayer, Marker } from 'react-leaflet';
import mapIcon from '../../utils/mapIcon';

import api from '../../services/api';
import MapMarker from '../../assets/images/map-marker.svg';
import { OrphanageProps } from '../Orphanage';

import {
  Container,
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  StyledMap,
  StyledPopup,
} from './styles';

const OrphanagesMap: React.FC = () => {
  const [orphanages, setOrphanages] = useState<OrphanageProps[]>([]);

  useEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    });
  }, []);

  return (
    <Container>
      <Sidebar>
        <SidebarHeader>
          <img src={MapMarker} alt='Happy' />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </SidebarHeader>

        <SidebarFooter>
          <strong>São Carlos</strong>
          <span>São Paulo</span>
        </SidebarFooter>
      </Sidebar>

      <StyledMap
        center={[-21.9963953, -47.8921486]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />

        {orphanages.map(orphanage => {
          return (
            <Marker
              key={orphanage.id}
              position={[orphanage.latitude, orphanage.longitude]}
              icon={mapIcon}
            >
              <StyledPopup closeButton={false} minWidth={240} maxWidth={240}>
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color='#fff' />
                </Link>
              </StyledPopup>
            </Marker>
          );
        })}
      </StyledMap>

      <Link to='/orphanages/create'>
        <FiPlus size={32} color='#fff' />
      </Link>
    </Container>
  );
};

export default OrphanagesMap;
