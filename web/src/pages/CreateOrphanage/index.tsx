import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { useHistory } from 'react-router-dom';
import { FiPlus, FiX } from 'react-icons/fi';
import Sidebar from '../../components/Sidebar';

import mapIcon from '../../utils/mapIcon';
import api from '../../services/api';

import {
  Container,
  Content,
  InputBlock,
  NewImage,
  ButtonSelect,
  ConfirmButton,
} from './styles';
import { LeafletMouseEvent } from 'leaflet';

export const CreateOrphanage: React.FC = () => {
  const history = useHistory();
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;

    const selectedImages = Array.from(event.target.files);

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image =>
      URL.createObjectURL(image)
    );

    setPreviewImages(selectedImagesPreview);

    event.target.value = '';
  }

  const onImageRemoveClick = useCallback((image: string, index: number) => {
    setImages(state => {
      const newState = state;
      newState.splice(index, 1);
      return newState;
    });
    setPreviewImages(state => state.filter(pImage => pImage !== image));
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const { latitude, longitude } = position;

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('latitude', latitude.toString());
    data.append('longitude', longitude.toString());
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', open_on_weekends.toString());

    images.forEach(image => {
      data.append('images', image);
    });

    await api.post('orphanages', data);

    history.push('/orphanages/created');
  }

  return (
    <Container>
      <Sidebar />

      <Content>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-21.9963953, -47.8921486]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {position.latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[position.latitude, position.longitude]}
                />
              )}
            </Map>

            <InputBlock>
              <label htmlFor='name'>Nome</label>
              <input
                id='name'
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </InputBlock>

            <InputBlock>
              <label htmlFor='about'>
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                id='about'
                value={about}
                maxLength={300}
                onChange={event => setAbout(event.target.value)}
              />
            </InputBlock>

            <InputBlock>
              <label htmlFor='images'>Fotos</label>

              <div className='images-container'>
                {previewImages.map((pImage, index) => {
                  return (
                    <div key={pImage}>
                      <img src={pImage} alt={name} />
                      <button
                        type='button'
                        className='img-close-button'
                        onClick={() => onImageRemoveClick(pImage, index)}
                      >
                        <FiX size={24} color='#FF669D' />
                      </button>
                    </div>
                  );
                })}
                <NewImage htmlFor='image[]'>
                  <FiPlus size={24} color='#15b6d6' />
                </NewImage>
              </div>
              <input
                multiple
                type='file'
                id='image[]'
                onChange={handleSelectImages}
              />
            </InputBlock>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <InputBlock>
              <label htmlFor='instructions'>Instruções</label>
              <textarea
                id='instructions'
                value={instructions}
                onChange={event => setInstructions(event.target.value)}
              />
            </InputBlock>

            <InputBlock>
              <label htmlFor='opening_hours'>Horário de funcionamento</label>
              <input
                id='opening_hours'
                value={opening_hours}
                onChange={event => setOpeningHours(event.target.value)}
              />
            </InputBlock>

            <InputBlock>
              <label htmlFor='open_on_weekends'>Atende fim de semana</label>

              <ButtonSelect>
                <button
                  type='button'
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button
                  type='button'
                  className={!open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </ButtonSelect>
            </InputBlock>
          </fieldset>

          <ConfirmButton type='submit'>Confirmar</ConfirmButton>
        </form>
      </Content>
    </Container>
  );
};

export default CreateOrphanage;
