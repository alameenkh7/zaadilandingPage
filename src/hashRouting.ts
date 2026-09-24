/** Hash paths served at `/#…` so the CDN only needs to return `/` (index.html). */
export const ACCOUNT_DELETION_HASH_PATH = '/account-deletion';

/** Submit this URL to Google Play Console while path-based SPA rewrites are unreliable. */
export const ACCOUNT_DELETION_PUBLIC_URL =
  'https://platiokitchen.com/#/account-deletion';

export type HashRoute = 'account-deletion';

function normalizeHashPath(hash: string): string {
  const raw = hash.replace(/^#/, '').trim();
  if (!raw) return '';
  return raw.startsWith('/') ? raw : `/${raw}`;
}

export function getHashRoute(): HashRoute | null {
  const path = normalizeHashPath(window.location.hash);
  if (path === ACCOUNT_DELETION_HASH_PATH || path === `${ACCOUNT_DELETION_HASH_PATH}/`) {
    return 'account-deletion';
  }
  return null;
}

/** Clear the hash without a full page reload (updates hash-gated views). */
export function clearLocationHash(): void {
  const { pathname, search } = window.location;
  const next = `${pathname}${search}`;
  window.history.replaceState(null, '', next);
  window.dispatchEvent(new Event('platio-hash-sync'));
}

export const HASH_SYNC_EVENT = 'platio-hash-sync';

export function goHomeFromHash(e: { preventDefault(): void }): void {
  if (!getHashRoute()) return;
  e.preventDefault();
  clearLocationHash();
}
