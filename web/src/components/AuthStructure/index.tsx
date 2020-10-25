import React from 'react';

import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import logoVerticalImg from '../../assets/images/logo-vertical.svg';

import {
  Container,
  Background,
  LoginSection,
  Location,
  MainSection,
  BackButton,
} from './styles';

interface AuthStructureProps {
  noBackButton?: number;
}

const AuthStructure: React.FC<AuthStructureProps> = ({
  noBackButton,
  children,
}) => {
  const history = useHistory();

  return (
    <Container>
      <Background>
        <img src={logoVerticalImg} alt='Happy' />
        <Location>
          <strong>São Carlos</strong>
          <span>São Paulo</span>
        </Location>
      </Background>
      <LoginSection>
        {!noBackButton && (
          <BackButton onClick={history.goBack}>
            <FiArrowLeft size={24} color='#15C3D6' />
          </BackButton>
        )}
        <MainSection>{children}</MainSection>
      </LoginSection>
    </Container>
  );
};

export default AuthStructure;
