import React, { useCallback, useEffect, useState } from 'react';
import { FiClock, FiInfo } from 'react-icons/fi';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import api from '../../services/api';

import mapIcon from '../../utils/mapIcon';

import {
  Container,
  Content,
  Images,
  OrphanageDetailsContent,
  MapContainer,
  OpenDetails,
} from './styles';

export interface OrphanageProps {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    url: string;
    id: number;
  }>;
}

interface OrphanageParams {
  id: string;
}

export default function Orphanage() {
  const [orphanage, setOrphanage] = useState<OrphanageProps>();
  const [selectedImage, setSelectedImage] = useState(0);
  const { id } = useParams<OrphanageParams>();

  useEffect(() => {
    api.get(`orphanages/${id}`).then(response => {
      setOrphanage(response.data);
    });
  }, [id]);

  const onImageClick = useCallback((index: number) => {
    setSelectedImage(index);
  }, []);

  if (!orphanage) {
    return <p>Carregando...</p>;
  }

  return (
    <Container>
      <Sidebar />

      <Content>
        <div className='orphanage-details'>
          {orphanage.images.length > 0 && (
            <>
              <img
                src={orphanage.images[selectedImage].url}
                alt={orphanage.name}
              />
              <Images>
                {orphanage.images.map((image, index) => {
                  return (
                    <button
                      key={image.id}
                      type='button'
                      className={index === selectedImage ? 'active' : ''}
                      onClick={() => onImageClick(index)}
                    >
                      <img src={image.url} alt={orphanage.name} />
                    </button>
                  );
                })}
              </Images>
            </>
          )}

          <OrphanageDetailsContent>
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <MapContainer>
              <Map
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
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
                  interactive={false}
                  icon={mapIcon}
                  position={[orphanage.latitude, orphanage.longitude]}
                />
              </Map>

              <footer>
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </MapContainer>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <OpenDetails>
              <div className='hour'>
                <FiClock size={32} color='#15B6D6' />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </div>
              {orphanage.open_on_weekends ? (
                <div className='open-on-weekends'>
                  <FiInfo size={32} color='#39CC83' />
                  Atendemos <br />
                  fim de semana
                </div>
              ) : (
                <div className='not-open-on-weekends'>
                  <FiInfo size={32} color='#FF669D' />
                  Não atendemos <br />
                  fim de semana
                </div>
              )}
            </OpenDetails>
          </OrphanageDetailsContent>
        </div>
      </Content>
    </Container>
  );
}
