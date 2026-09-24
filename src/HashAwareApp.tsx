import { useEffect, useState } from 'react';
import App from './App';
import AccountDeletion from './pages/AccountDeletion';
import { getHashRoute, HASH_SYNC_EVENT, type HashRoute } from './hashRouting';

export default function HashAwareApp() {
  const [hashRoute, setHashRoute] = useState<HashRoute | null>(() => getHashRoute());

  useEffect(() => {
    const sync = () => setHashRoute(getHashRoute());
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
    window.addEventListener(HASH_SYNC_EVENT, sync);
    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('popstate', sync);
      window.removeEventListener(HASH_SYNC_EVENT, sync);
    };
  }, []);

  if (hashRoute === 'account-deletion') {
    return <AccountDeletion />;
  }

  return <App />;
}
