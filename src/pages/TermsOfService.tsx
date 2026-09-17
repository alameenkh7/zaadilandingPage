import LegalDocument from '../components/LegalDocument';
import { title, lastUpdated, blocks } from '../content/termsOfService';

export default function TermsOfService() {
  return <LegalDocument title={title} lastUpdated={lastUpdated} blocks={blocks} />;
}
