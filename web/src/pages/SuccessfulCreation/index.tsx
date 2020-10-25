import React from 'react';
import { useHistory } from 'react-router-dom';

import successImg from '../../assets/images/success.svg';

import { Container, Message } from './styles';

const SuccessfulCreation: React.FC = () => {
  const history = useHistory();

  return (
    <Container>
      <Message>
        <h1>Ebaaa!</h1>
        <p>
          O cadastro deu certo e foi enviado ao administrador para ser aprovado.
          Agora é só esperar :)
        </p>
        <button type='button' onClick={() => history.push('/app')}>
          Voltar para o mapa
        </button>
      </Message>
      <img src={successImg} alt='Cadastro realizado' />
    </Container>
  );
};

export default SuccessfulCreation;
