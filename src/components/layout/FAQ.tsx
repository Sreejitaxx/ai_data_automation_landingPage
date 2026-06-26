import React, { memo } from 'react';
import { HelpCircle } from 'lucide-react';
import { Container, Section, SectionHeading, Accordion } from '../ui';
import { FAQ_ITEMS } from '../../constants';

const FAQ: React.FC = memo(() => {
  const accordionItems = FAQ_ITEMS.map(item => ({
    id: item.id,
    title: item.question,
    content: (
      <p className="text-neutral-400 leading-relaxed">
        {item.answer}
      </p>
    ),
  }));

  return (
    <Section id="faq">
      <Container>
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about Nexus AI"
        />
        <div className="max-w-3xl mx-auto">
          <Accordion items={accordionItems} defaultOpen={[FAQ_ITEMS[0].id]} />
        </div>
        <div className="text-center mt-10">
          <div className="glass rounded-xl p-6 inline-flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-primary-400" />
            <p className="text-neutral-300">
              Still have questions?{' '}
              <a href="#" className="text-primary-400 hover:text-primary-300 underline underline-offset-4">
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
});

FAQ.displayName = 'FAQ';

export { FAQ };
