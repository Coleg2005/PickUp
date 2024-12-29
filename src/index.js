import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Auth0Provider
        domain="dev-b5n3phve6ro07grg.us.auth0.com"
        clientID="Pqn9QxoKeCmXq11e8BchWFmWbBsPFao9"
        authorizationParams={{
        redirect_uri: 'localHost:3000',
        }}
    >
      <App />
    </Auth0Provider>
  );