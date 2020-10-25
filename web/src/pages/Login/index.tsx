import React, { FormEvent, useMemo, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';
import AuthStructure from '../../components/AuthStructure';
import { useAuth } from '../../contexts/AuthContext';

import { InputBlock } from '../CreateOrphanage/styles';
import { LoginForm } from './styles';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();
  const history = useHistory();

  const isInvalid = useMemo(() => {
    return email.length === 0 || password.length === 0;
  }, [email, password]);

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await signIn({ email, password });
    history.push('/dashboard');
  }

  return (
    <AuthStructure>
      <LoginForm onSubmit={e => handleLogin(e)}>
        <h1>Fazer login</h1>

        <InputBlock>
          <label htmlFor='email'>E-mail</label>
          <input
            id='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </InputBlock>
        <InputBlock>
          <label htmlFor='password'>Senha</label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </InputBlock>
        <Link to='/forgot-password'>Esqueci minha senha</Link>
        <button type='submit' disabled={isInvalid}>
          Entrar
        </button>
      </LoginForm>
    </AuthStructure>
  );
};

export default Login;
