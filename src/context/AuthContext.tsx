import React, {createContext, useReducer, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IUSER_TYPE} from '../utils/constants';

type AuthState = {
  isLoading: boolean;
  isLoggedIn: boolean;
  accountType: IUSER_TYPE;
};

type AuthAction =
  | {type: 'LOGIN'; accountType: IUSER_TYPE}
  | {type: 'LOGOUT'}
  | {type: 'RESTORE_TOKEN'; accountType: IUSER_TYPE};

const initialState: AuthState = {
  isLoading: false,
  isLoggedIn: false,
  accountType: null,
};

const AuthContext = createContext<
  | {
      state: AuthState;
      logIn: (type: string) => Promise<void>;
      logOut: () => Promise<void>;
    }
  | undefined
>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        accountType: action.accountType,
        isLoading: false,
      };
    case 'LOGOUT':
      return {...state, isLoggedIn: false, accountType: null, isLoading: false};
    case 'RESTORE_TOKEN':
      return {
        ...state,
        accountType: action.accountType,
        isLoggedIn: !!action.accountType,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const restoreToken = async () => {
      let accountType;
      try {
        accountType = await AsyncStorage.getItem('accountType');
      } catch (e) {
        console.error('Failed to load token', e);
      }
      if (accountType) {
        dispatch({
          type: 'RESTORE_TOKEN',
          accountType: accountType as IUSER_TYPE,
        });
      }
    };
    restoreToken();
  }, []);

  const logIn = async (accountType: 'basic_user' | 'pro_user') => {
    try {
      await AsyncStorage.setItem('accountType', accountType);
      dispatch({type: 'LOGIN', accountType});
    } catch (e) {
      console.error('Failed to log in', e);
    }
  };

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('accountType');
      dispatch({type: 'LOGOUT'});
    } catch (e) {
      console.error('Failed to log out', e);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        state,
        logIn: (type: string) => logIn(type as 'basic_user' | 'pro_user'),
        logOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
