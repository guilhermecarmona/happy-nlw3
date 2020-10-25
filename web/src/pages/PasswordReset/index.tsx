import React, { FormEvent, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AuthStructure from '../../components/AuthStructure';
import api from '../../services/api';

import { InputBlock } from '../CreateOrphanage/styles';
import { ResetPasswordForm } from './styles';

const PasswordReset: React.FC = () => {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const location = useLocation();

  const isInvalid = useMemo(() => {
    return password.length === 0 || repeatPassword.length === 0;
  }, [password, repeatPassword]);

  async function handleResetPassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (password === repeatPassword) {
      const token = location.search.replace('?token=', '');
      if (token) api.post('/reset', { token, password });
    }
  }

  return (
    <AuthStructure noBackButton={1}>
      <ResetPasswordForm onSubmit={handleResetPassword}>
        <h1>Redefinição de senha</h1>

        <p>Escolha uma nova senha para você acessar o dashboard do Happy</p>
        <InputBlock>
          <label htmlFor='password'>Nova senha</label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </InputBlock>
        <InputBlock>
          <label htmlFor='repeat-password'>Repetir senha</label>
          <input
            id='repeat-password'
            type='password'
            value={repeatPassword}
            onChange={e => setRepeatPassword(e.target.value)}
          />
        </InputBlock>
        <button type='submit' disabled={isInvalid}>
          Redefinir
        </button>
      </ResetPasswordForm>
    </AuthStructure>
  );
};

export default PasswordReset;
