import {
  Navigation,
  Hero,
  TrustedBy,
  Statistics,
  Features,
  Pricing,
  Testimonials,
  FAQ,
  FinalCTA,
  Footer,
} from './components/layout';
import { AuroraBackground, ParticleField, CursorSpotlight } from './components/effects';
import { useReducedMotion } from './hooks';

function App() {
  const { prefersReducedMotion } = useReducedMotion();

  return (
    <div className="relative min-h-screen bg-neutral-950 overflow-x-hidden">
      {/* Ambient Background Effects */}
      <AuroraBackground />
      {!prefersReducedMotion && <ParticleField count={25} />}

      {/* Cursor Spotlight (desktop only) */}
      {!prefersReducedMotion && (
        <div className="hidden lg:block">
          <CursorSpotlight size={300} className="opacity-20" />
        </div>
      )}

      {/* Main Content */}
      <main role="main">
        <Navigation />
        <Hero />
        <TrustedBy />
        <Statistics />
        <Features />
        <Pricing />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}

export default App;
