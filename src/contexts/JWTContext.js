import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';

import jwt_decode from "jwt-decode";

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('authToken')) : '';

        console.log('ACCESS TOKEN')
        console.log(accessToken);

        let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/token/refresh/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 'refresh': accessToken.refresh })
        })

        let data = await response.json()

        if (response.status === 200) {
          // setAuthTokens(data)
          const user = jwt_decode(data.access)
          localStorage.setItem('authToken', JSON.stringify(data))

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }

        // const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/token`);
        // const { user } = response.data;

      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (username, password) => {

    // alert(username, password);
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/token/`, {
      username,
      password,
    });

    const { access, refresh } = response.data;

    const user = jwt_decode(response.data.access);
    console.log('USER', user);

    console.log(access);
    console.log(response.data);
    localStorage.setItem('authToken', JSON.stringify(response.data));
    localStorage.setItem('refreshToken', 'refresh');
    localStorage.setItem('Token', '');
    // setSession(access);

    dispatch({
      type: 'LOGIN',
      payload: {
        user,
      },
    });
  };

  const register = async (email, password, firstName, lastName) => {
    const response = await axios.post('/api/account/register', {
      email,
      password,
      firstName,
      lastName,
    });
    const { accessToken, user } = response.data;

    localStorage.setItem('accessToken', accessToken);
    dispatch({
      type: 'REGISTER',
      payload: {
        user,
      },
    });
  };

  const logout = async () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    dispatch({ type: 'LOGOUT' });
  };


  let updateToken = async () => {

    const accessToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('authToken')) : '';

    let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 'refresh': accessToken.refresh })
    })

    let data = await response.json()

    if (response.status === 200) {
      localStorage.setItem('authToken', JSON.stringify(data))
      dispatch({
        type: 'INITIALIZE',
        payload: {
          isAuthenticated: true,
          user,
        },
      });
    } else {
      logout()
    }
  }

  useEffect(() => {

    let fourMinutes = 1000 * 60 * 4

    // alert('updateToken')
    let interval = setInterval(() => {
      updateToken()
      // alert('updateToken')
    }, fourMinutes)
    return () => clearInterval(interval)

  }, [])



  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
