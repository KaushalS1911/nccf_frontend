import PropTypes from 'prop-types';
import { useMemo, useEffect, useCallback, useState } from 'react';

import { AuthContext } from './auth-context';
import { setSession } from './utils';

const STORAGE_KEY = 'vendor';

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);

  const initialize = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(STORAGE_KEY);

      if (accessToken) {
        await setSession(accessToken);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // ----------------------------------------------------------------------

  const checkAuthenticated = sessionStorage.getItem(STORAGE_KEY)
    ? 'authenticated'
    : 'unauthenticated';

  const status = loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
    }),
    [status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
