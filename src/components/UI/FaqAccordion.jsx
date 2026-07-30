import { useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Minus, Plus } from '@phosphor-icons/react';
import { cn } from '../../lib/utils';

export function FaqAccordion({
  data,
  className,
  timestamp = 'Atualizado diariamente, 24/7',
  questionClassName,
  answerClassName,
}) {
  const [openItem, setOpenItem] = useState(null);
  const componentId = useId().replaceAll(':', '');
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={cn('w-full py-2', className)}>
      {timestamp ? (
        <p className="mb-6 text-xs font-mono tracking-widest text-black/50 dark:text-white/50 uppercase flex items-center gap-2">
          <span
            className="inline-block w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981]"
            aria-hidden="true"
          />
          {timestamp}
        </p>
      ) : null}

      {data.map((item) => {
        const itemValue = String(item.id);
        const isOpen = openItem === itemValue;
        const triggerId = `${componentId}-faq-trigger-${itemValue}`;
        const panelId = `${componentId}-faq-panel-${itemValue}`;

        return (
          <div key={item.id} className="mb-4">
            <h3 className="m-0">
              <button
                type="button"
                id={triggerId}
                className="flex w-full items-center justify-between gap-x-4 text-left group cursor-pointer focus-visible:outline-none"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenItem(isOpen ? null : itemValue)}
              >
                <span
                  className={cn(
                    'relative flex items-center space-x-3 rounded-2xl px-5 py-3.5 transition-all duration-300 border ms-faq-question',
                    isOpen
                      ? 'ms-faq-question--open'
                      : 'ms-faq-question--closed',
                    questionClassName,
                  )}
                >
                  {item.icon ? (
                    <span
                      className={cn(
                        'absolute -top-3 text-2xl select-none pointer-events-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] z-10',
                        item.iconPosition === 'right' ? '-right-2.5' : '-left-2.5',
                      )}
                      style={{
                        transform: item.iconPosition === 'right' ? 'rotate(8deg)' : 'rotate(-6deg)',
                      }}
                      aria-hidden="true"
                    >
                      {item.icon}
                    </span>
                  ) : null}
                  <span className="font-medium text-[0.98rem] tracking-tight">{item.question}</span>
                </span>

                <span
                  className={cn(
                    'flex items-center justify-center w-9 h-9 rounded-xl border ms-faq-icon transition-all duration-300 shrink-0',
                    isOpen ? 'ms-faq-icon--open' : 'ms-faq-icon--closed',
                  )}
                  aria-hidden="true"
                >
                  {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="ml-4 mt-2.5 md:ml-8">
                    <div
                      className={cn(
                        'ms-faq-answer relative max-w-[580px] rounded-2xl px-5 py-4 text-[0.94rem] leading-relaxed backdrop-blur-md',
                        answerClassName,
                      )}
                    >
                      {item.answer}
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
