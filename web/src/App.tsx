import React from 'react';
import Landing from './pages/Landing';
import Routes from './routes';
import 'leaflet/dist/leaflet.css';
import GlobalStyles from './styles/global';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Landing />
      </Routes>
      <GlobalStyles />
    </AuthProvider>
  );
}

export default App;
