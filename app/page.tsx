import Navigation from '@/components/Navigation';
import Hero from '@/components/sections/Hero';
import Problem from '@/components/sections/Problem';
import Pipeline from '@/components/sections/Pipeline';
import TwoWays from '@/components/sections/TwoWays';
import Granularity from '@/components/sections/Granularity';
import StopManaging from '@/components/sections/StopManaging';
import AIReadiness from '@/components/sections/AIReadiness';
import Differentiators from '@/components/sections/Differentiators';
import DashboardShowcase from '@/components/sections/DashboardShowcase';
import FinalCTA from '@/components/sections/FinalCTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navigation />
      <Hero />
      <Problem />
      <Pipeline />
      <TwoWays />
      <Granularity />
      <StopManaging />
      <AIReadiness />
      <Differentiators />
      <DashboardShowcase />
      <FinalCTA />
      <Footer />
    </main>
  );
}
