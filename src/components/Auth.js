import { 
  useState, 
  useEffect, 
  createContext, 
  useContext, 
  useLayoutEffect
 } from 'react';

import api from '@/api';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return authContext;
}

export const AuthProvider = ({ children }) => {
  // access token
  const [token, setToken] = useState();

  // runs once on mount and get the user from api
  useEffect(() => {
    const fetchMe = async () => {
    try {
      const response = await api.get('/api/me');
      // gets the response and sets it as a state and user is signed in
      setToken(response.data.accessToken);
    } catch {
      // else token is null and user is not signed in
      setToken(null);
    }
    };

    fetchMe();
  }, []);

  // runs once on mount and every time token changes, useLayoutEffect to wait for request before rest of code is run
  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use((config) => {
      // if htere is a token, add the token to the headers of the request to server
      config.headers.Authorization = !config._retry && token ? `Bearer ${token}` : config.headers.Authorization;
      return config;
    });

    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if ( 
          error.response.status === 403 &&
          error.response.data.message === 'Unauthorized'
        ) {
          try {
            const response = await api.get('/api/refreshToken');

            setToken(response.data.accessToken);

            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
            originalRequest._retry = true;

            return api(originalRequest);
          } catch {
            setToken(null)
          }
        }

        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, []);

  return (
    <AuthContext.Provider 
      value={{
        token,
        setToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}



