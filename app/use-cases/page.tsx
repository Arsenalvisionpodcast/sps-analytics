import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import UseCasesHero from '@/components/use-cases/UseCasesHero';
import UseCasesExplorer from '@/components/use-cases/UseCasesExplorer';
import DecisionCategories from '@/components/use-cases/DecisionCategories';
import UseCasesCTA from '@/components/use-cases/UseCasesCTA';

const description =
  'Three problems, nine use cases, one foundation. SPS Decision Intelligence turns POS data into better decisions for brands and suppliers across every sales channel.';

export const metadata: Metadata = {
  title: 'SPS Commerce | Use Cases',
  description,
  openGraph: {
    title: 'Three problems. Nine use cases. One foundation.',
    description,
    url: '/use-cases',
    siteName: 'SPS Decision Intelligence',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Three problems. Nine use cases. One foundation.',
    description,
  },
};

export default function UseCasesPage() {
  return (
    <main className="overflow-x-hidden">
      <Navigation />
      <UseCasesHero />
      <UseCasesExplorer />
      <DecisionCategories />
      <UseCasesCTA />
      <Footer />
    </main>
  );
}
