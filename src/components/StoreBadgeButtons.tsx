import { APP_STORE_URL, PLAY_STORE_URL } from '../data/storeUrls';

export type StorePicker = 'appstore' | 'playstore';

const appleIcon = (
  <svg viewBox="0 0 24 24" aria-hidden>
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
  </svg>
);

const playIcon = (
  <svg viewBox="0 0 24 24" aria-hidden>
    <path d="M3.6 2.6c-.4.3-.6.8-.6 1.4v16c0 .6.2 1.1.6 1.4l.3.2 9-9v-.2l-9-9-.3.2zm11.9 9.9l2.9-2.9-9.7-5.6 6.8 8.5zm-6.8 8.5l9.7-5.6-2.9-2.9-6.8 8.5zm11.3-6.5c.7-.4.7-1.4 0-1.8l-2.6-1.5-3 3 3 3 2.6-1.7z" />
  </svg>
);

type Props = {
  /** Tap badge to show QR (download section) */
  mode: 'picker';
  selected: StorePicker | null;
  onSelect: (store: StorePicker) => void;
};

type LinkProps = {
  mode: 'link';
};

export default function StoreBadgeButtons(props: Props | LinkProps) {
  const classFor = (key: StorePicker) =>
    props.mode === 'picker' && props.selected === key ? ' store-pick is-active' : '';

  if (props.mode === 'link') {
    return (
      <div className="store-badges">
        <a
          href={APP_STORE_URL}
          className="store-badge"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Download on the App Store"
        >
          {appleIcon}
          <span className="badge-text">
            <small>Download on the</small>
            <strong>App Store</strong>
          </span>
        </a>
        <a
          href={PLAY_STORE_URL}
          className="store-badge"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Get it on Google Play"
        >
          {playIcon}
          <span className="badge-text">
            <small>Get it on</small>
            <strong>Google Play</strong>
          </span>
        </a>
      </div>
    );
  }

  return (
    <div className="store-badges">
      <button
        type="button"
        className={`store-badge store-pick${classFor('appstore')}`}
        onClick={() => props.onSelect('appstore')}
        aria-label="Download on the App Store"
        aria-pressed={props.selected === 'appstore'}
      >
        {appleIcon}
        <span className="badge-text">
          <small>Download on the</small>
          <strong>App Store</strong>
        </span>
      </button>
      <button
        type="button"
        className={`store-badge store-pick${classFor('playstore')}`}
        onClick={() => props.onSelect('playstore')}
        aria-label="Get it on Google Play"
        aria-pressed={props.selected === 'playstore'}
      >
        {playIcon}
        <span className="badge-text">
          <small>Get it on</small>
          <strong>Google Play</strong>
        </span>
      </button>
    </div>
  );
}