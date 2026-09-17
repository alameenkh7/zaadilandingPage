import LegalDocument from '../components/LegalDocument';
import { title, lastUpdated, blocks } from '../content/privacyPolicy';

export default function PrivacyPolicy() {
  return <LegalDocument title={title} lastUpdated={lastUpdated} blocks={blocks} />;
}
