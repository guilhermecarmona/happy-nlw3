import React, { FormEvent, useMemo, useState } from 'react';

import AuthStructure from '../../components/AuthStructure';
import api from '../../services/api';

import { InputBlock } from '../CreateOrphanage/styles';
import { ForgotPasswordForm } from './styles';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');

  const isInvalid = useMemo(() => {
    return email.length === 0;
  }, [email]);

  async function handleForgottenPassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await api.post('/forgot', { email });
  }

  return (
    <AuthStructure>
      <ForgotPasswordForm onSubmit={handleForgottenPassword}>
        <h1>Esqueci a senha</h1>

        <p>Sua redefinição de senha será enviada para o e-mail cadastrado.</p>
        <InputBlock>
          <label htmlFor='email'>E-mail</label>
          <input
            id='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </InputBlock>
        <button type='submit' disabled={isInvalid}>
          Enviar
        </button>
      </ForgotPasswordForm>
    </AuthStructure>
  );
};

export default ForgotPassword;
