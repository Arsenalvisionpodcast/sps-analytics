import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import UseCasesHero from '@/components/use-cases/UseCasesHero';
import UseCasesExplorer from '@/components/use-cases/UseCasesExplorer';
import DecisionCategories from '@/components/use-cases/DecisionCategories';
import UseCasesCTA from '@/components/use-cases/UseCasesCTA';

export const metadata: Metadata = {
  title: 'SPS Commerce | Use Cases',
  description:
    'Three problems, nine use cases, one foundation. SPS Analytics is a decision optimization platform that turns POS data into better decisions for brands and suppliers across every sales channel.',
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
