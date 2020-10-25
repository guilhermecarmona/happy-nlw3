import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import mapMarkerImg from '../../assets/images/map-marker.svg';

import { StyledSidebar, Footer } from './styles';

const Sidebar: React.FC = () => {
  const { goBack } = useHistory();

  return (
    <StyledSidebar>
      <img src={mapMarkerImg} alt='Happy' />

      <Footer>
        <button type='button' onClick={goBack}>
          <FiArrowLeft size={24} color='#FFF' />
        </button>
      </Footer>
    </StyledSidebar>
  );
};

export default Sidebar;
