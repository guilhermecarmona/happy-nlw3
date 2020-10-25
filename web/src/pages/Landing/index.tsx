import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Logo from '../../assets/images/logo.svg';

import { Container, ContentWrapper, Location } from './styles';

const Landing: React.FC = () => {
  return (
    <Container>
      <ContentWrapper>
        <div>
          <img src={Logo} alt='Happy' />
          <Location>
            <strong>São Carlos</strong>
            <span>São Paulo</span>
          </Location>
        </div>

        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>

        <Link to='/dashboard' className='acesso-restrito'>
          Acesso Restrito
        </Link>

        <Link to='app' className='app-link'>
          <FiArrowRight size={26} color='rgba(0,0,0,0.6)' />
        </Link>
      </ContentWrapper>
    </Container>
  );
};
export default Landing;
