import React from 'react';
import { FiAlertCircle, FiPower, FiMapPin } from 'react-icons/fi';
import { Link, useHistory, useLocation } from 'react-router-dom';

import mapMarkerImg from '../../assets/images/map-marker.svg';
import { useAuth } from '../../contexts/AuthContext';

import { StyledSidebar, MenuOptions, Footer } from './styles';

const SidebarDashboard: React.FC = () => {
  const location = useLocation();
  const history = useHistory();

  const { signOut } = useAuth();

  const paths = ['/dashboard', '/pending'];

  function handleSignOut() {
    signOut();
    history.replace('/');
  }

  return (
    <StyledSidebar>
      <Link to='/app'>
        <img src={mapMarkerImg} alt='Happy' />
      </Link>
      <MenuOptions>
        <button
          type='button'
          className={location.pathname === paths[0] ? 'active' : ''}
          onClick={() => history.push('/dashboard')}
        >
          <FiMapPin size={24} />
        </button>
        <button
          type='button'
          className={location.pathname === paths[1] ? 'active' : ''}
          onClick={() => history.push('/pending')}
        >
          <FiAlertCircle size={24} />
        </button>
      </MenuOptions>

      <Footer>
        <button type='button' onClick={handleSignOut}>
          <FiPower size={24} color='#FFF' />
        </button>
      </Footer>
    </StyledSidebar>
  );
};

export default SidebarDashboard;
