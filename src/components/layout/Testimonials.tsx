import { memo, useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { Container, Section, SectionHeading } from '../ui';
import { TESTIMONIALS } from '../../constants';
import { useViewport } from '../../hooks';

const Testimonials = memo(() => {
  const { isMobile, isTablet } = useViewport();

  return (
    <Section id="testimonials">
      <Container>
        <SectionHeading
          title="Loved by Data Teams"
          subtitle="See why thousands of companies trust Nexus AI for their data operations"
        />

        {/* Desktop: Grid Layout */}
        {!isMobile && !isTablet && (
          <TestimonialsGrid testimonials={TESTIMONIALS} />
        )}

        {/* Tablet/Mobile: Carousel */}
        {(isMobile || isTablet) && (
          <TestimonialsCarousel testimonials={TESTIMONIALS} />
        )}
      </Container>
    </Section>
  );
});

Testimonials.displayName = 'Testimonials';

// Desktop Grid
const TestimonialsGrid: React.FC<{ testimonials: typeof TESTIMONIALS }> = memo(({ testimonials }) => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {testimonials.slice(0, 6).map((testimonial, index) => (
      <TestimonialCard
        key={testimonial.id}
        testimonial={testimonial}
        index={index}
      />
    ))}
  </div>
));

TestimonialsGrid.displayName = 'TestimonialsGrid';

// Carousel for Mobile/Tablet
const TestimonialsCarousel = memo(({ testimonials }: { testimonials: typeof TESTIMONIALS }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = useCallback(() => {
    setCurrentIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
  }, [testimonials.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
  }, [testimonials.length]);

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 px-2">
              <TestimonialCard
                testimonial={testimonial}
                index={index}
                isActive={index === currentIndex}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          type="button"
          onClick={goToPrevious}
          className="p-3 rounded-full glass hover:bg-white/[0.08] transition-colors"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5 text-neutral-400" />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-primary-500' : 'bg-neutral-700'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={goToNext}
          className="p-3 rounded-full glass hover:bg-white/[0.08] transition-colors"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5 text-neutral-400" />
        </button>
      </div>
    </div>
  );
});

TestimonialsCarousel.displayName = 'TestimonialsCarousel';

// Individual Testimonial Card
interface TestimonialCardProps {
  testimonial: typeof TESTIMONIALS[0];
  index: number;
  isActive?: boolean;
}

const TestimonialCard = memo(({
  testimonial,
  index: _index,
  isActive = true,
}: TestimonialCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className={`
        glass rounded-2xl p-6 h-full transition-all duration-300
        ${isActive ? 'opacity-100 scale-100' : 'opacity-70 scale-95'}
      `}
    >
      {/* Quote Icon */}
      <Quote className="w-8 h-8 text-primary-500/30 mb-4" aria-hidden="true" />

      {/* Rating */}
      <div className="flex gap-1 mb-4" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < testimonial.rating ? 'text-warning-500 fill-warning-500' : 'text-neutral-600'}`}
            fill={i < testimonial.rating ? 'currentColor' : 'none'}
          />
        ))}
      </div>

      {/* Content */}
      <blockquote className="text-neutral-300 leading-relaxed mb-6">
        "{testimonial.content}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3">
        {/* Avatar placeholder with initials */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
          <span className="text-sm font-semibold text-white">
            {testimonial.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div>
          <div className="font-medium text-neutral-200">{testimonial.name}</div>
          <div className="text-sm text-neutral-500">
            {testimonial.role}, {testimonial.company}
          </div>
        </div>
      </div>
    </div>
  );
});

TestimonialCard.displayName = 'TestimonialCard';

export { Testimonials };
