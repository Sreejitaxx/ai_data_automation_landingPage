import { memo, useRef, useEffect, useState, useCallback, useId, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { useReducedMotion } from '../../hooks';

interface AccordionItemProps {
  id: string;
  title: ReactNode;
  children: ReactNode;
  isOpen: boolean;
  onToggle: (id: string) => void;
  index: number;
}

const AccordionItem = memo(({
  id,
  title,
  children,
  isOpen,
  onToggle,
  index,
}: AccordionItemProps) => {
  const headerId = useId();
  const panelId = useId();
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);
  const { prefersReducedMotion } = useReducedMotion();

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [children]);

  const handleClick = useCallback(() => {
    onToggle(id);
  }, [id, onToggle]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle(id);
    }
  }, [id, onToggle]);

  return (
    <div
      className="glass rounded-xl overflow-hidden"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <button
        id={headerId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className="w-full flex items-center justify-between px-6 py-4 text-left font-medium text-neutral-200 hover:text-neutral-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset"
      >
        <span className="text-base md:text-lg">{title}</span>
        <ChevronDown
          className={`w-5 h-5 text-neutral-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        className="overflow-hidden transition-all duration-300 ease-smooth"
        style={{
          maxHeight: isOpen ? height : 0,
          transitionDuration: prefersReducedMotion ? '0ms' : '300ms',
        }}
      >
        <div
          ref={contentRef}
          className="px-6 pb-4 pt-2 text-neutral-400 leading-relaxed"
        >
          {children}
        </div>
      </div>
    </div>
  );
});

AccordionItem.displayName = 'AccordionItem';

interface AccordionProps {
  items: Array<{
    id: string;
    title: ReactNode;
    content: ReactNode;
  }>;
  allowMultiple?: boolean;
  defaultOpen?: string[];
  activeId?: string;
  onChange?: (activeIds: string[]) => void;
}

const Accordion = memo(({
  items,
  allowMultiple = false,
  defaultOpen = [],
  activeId,
  onChange,
}: AccordionProps) => {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(defaultOpen));

  // Sync with external activeId if provided
  useEffect(() => {
    if (activeId !== undefined) {
      setOpenIds(new Set([activeId]));
    }
  }, [activeId]);

  const handleToggle = useCallback((id: string) => {
    setOpenIds(prevOpenIds => {
      const newOpenIds = new Set(prevOpenIds);

      if (allowMultiple) {
        if (newOpenIds.has(id)) {
          newOpenIds.delete(id);
        } else {
          newOpenIds.add(id);
        }
      } else {
        if (newOpenIds.has(id)) {
          newOpenIds.clear();
        } else {
          newOpenIds.clear();
          newOpenIds.add(id);
        }
      }

      const openIdsArray = Array.from(newOpenIds);
      onChange?.(openIdsArray);
      return newOpenIds;
    });
  }, [allowMultiple, onChange]);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          title={item.title}
          isOpen={openIds.has(item.id)}
          onToggle={handleToggle}
          index={index}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
});

Accordion.displayName = 'Accordion';

export { Accordion, AccordionItem };
