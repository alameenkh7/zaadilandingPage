import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const profileItems = [
  'Rate Your Meals',
  'Meal History',
  'Billing & Wallet',
  'Refer Friends',
  'Delivery Location',
];

const deletionSteps = [
  'Open the Platio app and sign in.',
  'Tap Profile (bottom tab).',
  `Scroll past ${profileItems.join(', ')}.`,
  'In the Account section, directly above Sign out, tap Delete account.',
  'Confirm in the dialog. Your account is deleted immediately and you are signed out.',
];

export default function AccountDeletion() {
  return (
    <>
      <Navbar />
      <main className="legal-page">
        <div className="wrap">
          <Link to="/" className="legal-back">← Back to Platio</Link>
          <article className="legal-content">
            <h1>Delete your Platio account</h1>
            <p className="legal-meta">
              This page explains how account deletion works for Google Play and your reference.
              You cannot delete your account on this website — deletion is available only in the
              Platio mobile app.
            </p>

            <div className="legal-callout">
              <strong>Delete in the app:</strong> Profile → Account → Delete account (above Sign out).
            </div>

            <h2>How to delete your account in the app</h2>
            <ol className="deletion-steps">
              {deletionSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>

            <h2>Profile screen order</h2>
            <p>
              On Profile, settings appear in this order: {profileItems.join(' → ')} →{' '}
              <strong>Account</strong> (includes <strong>Delete account</strong>) →{' '}
              <strong>Sign out</strong> as a separate action below. Signing out only ends your
              session; it does not delete your account.
            </p>

            <h2>What happens when you delete</h2>
            <p>
              After you confirm deletion in the app, your Platio account is removed immediately,
              you are signed out, and you will need a new account to use Platio again. Any active
              subscription or scheduled meals tied to that account will not continue.
            </p>

            <h2>Data removed vs data we may keep</h2>
            <h3>Removed or deactivated</h3>
            <ul>
              <li>Profile and contact information (name, email, mobile number, profile photo).</li>
              <li>Login credentials and active app sessions.</li>
              <li>Saved delivery location and in-app meal preferences tied to your account.</li>
              <li>Active subscription enrollment in the app.</li>
              <li>Push notification registrations and marketing opt-in preferences for that account.</li>
              <li>Voluntary dietary or allergen preferences stored on your profile.</li>
            </ul>

            <h3>Retained as required by law or for legitimate business needs</h3>
            <ul>
              <li>
                Order, invoice, and payment transaction records for tax (ZATCA), accounting, and
                commercial record-keeping.
              </li>
              <li>
                Masked or tokenized payment references held by our payment providers (we do not
                store full card numbers).
              </li>
              <li>Food-safety and traceability records linked to orders you placed (SFDA).</li>
              <li>
                Information needed to resolve disputes, chargebacks, fraud prevention, or legal
                claims.
              </li>
              <li>Aggregated or de-identified data that cannot reasonably identify you.</li>
            </ul>
            <p>
              For more detail, see our{' '}
              <Link to="/privacy-policy" className="legal-inline-link">Privacy Policy</Link>.
            </p>

            <h2>Need help?</h2>
            <p>
              If you cannot access the app, contact us at{' '}
              <a href="mailto:support@PlatioKitchen.com" className="legal-inline-link">
                support@PlatioKitchen.com
              </a>{' '}
              from the email address on your account.
            </p>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
