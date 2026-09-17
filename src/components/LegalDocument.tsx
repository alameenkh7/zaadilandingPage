import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export type LegalBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'address'; lines: string[] };

function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[Privacy Policy\]|support@PlatioKitchen\.com)/g);

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        if (part === '[Privacy Policy]') {
          return (
            <Link key={i} to="/privacy-policy" className="legal-inline-link">
              Privacy Policy
            </Link>
          );
        }
        if (part === 'support@PlatioKitchen.com') {
          return (
            <a key={i} href="mailto:support@PlatioKitchen.com" className="legal-inline-link">
              support@PlatioKitchen.com
            </a>
          );
        }
        return part;
      })}
    </>
  );
}

type LegalDocumentProps = {
  title: string;
  lastUpdated: string;
  blocks: LegalBlock[];
};

export default function LegalDocument({ title, lastUpdated, blocks }: LegalDocumentProps) {
  return (
    <>
      <Navbar />
      <main className="legal-page">
        <div className="wrap">
          <Link to="/" className="legal-back">← Back to Platio</Link>
          <article className="legal-content">
            <h1>{title}</h1>
            <p className="legal-meta">Last updated: {lastUpdated}</p>
            {blocks.map((block, idx) => {
              switch (block.type) {
                case 'h2':
                  return <h2 key={idx}>{block.text}</h2>;
                case 'h3':
                  return <h3 key={idx}>{block.text}</h3>;
                case 'p':
                  return (
                    <p key={idx}>
                      <RichText text={block.text} />
                    </p>
                  );
                case 'ul':
                  return (
                    <ul key={idx}>
                      {block.items.map((item, itemIdx) => (
                        <li key={itemIdx}>
                          <RichText text={item} />
                        </li>
                      ))}
                    </ul>
                  );
                case 'address':
                  return (
                    <address key={idx} className="legal-address">
                      {block.lines.map((line, lineIdx) => (
                        <span key={lineIdx}>
                          <RichText text={line} />
                          {lineIdx < block.lines.length - 1 && <br />}
                        </span>
                      ))}
                    </address>
                  );
                default:
                  return null;
              }
            })}
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
