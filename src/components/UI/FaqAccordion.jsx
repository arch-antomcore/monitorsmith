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
        <p className="mb-6 text-xs font-mono tracking-widest text-neutral-500 dark:text-white/50 uppercase flex items-center gap-2">
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
                    'relative flex items-center space-x-3 rounded-2xl px-5 py-3.5 transition-all duration-300 border',
                    isOpen
                      ? 'bg-neutral-900/10 text-neutral-900 border-neutral-900/30 shadow-[0_4px_24px_rgba(0,0,0,0.08)] dark:bg-white/[0.1] dark:text-white dark:border-white/[0.28] dark:shadow-[0_4px_24px_rgba(0,0,0,0.5)]'
                      : 'bg-neutral-900/5 hover:bg-neutral-900/10 text-neutral-800 border-neutral-900/10 hover:border-neutral-900/20 dark:bg-white/[0.03] dark:hover:bg-white/[0.07] dark:text-white/80 dark:border-white/[0.08] dark:hover:border-white/[0.16]',
                    questionClassName,
                  )}
                >
                  {item.icon ? (
                    <span
                      className={cn(
                        'absolute -top-3 text-2xl select-none pointer-events-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] z-10',
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
                    'flex items-center justify-center w-9 h-9 rounded-xl border border-neutral-900/10 bg-neutral-900/5 text-neutral-600 transition-all duration-300 group-hover:border-neutral-900/20 group-hover:text-neutral-900 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white/60 dark:group-hover:border-white/[0.2] dark:group-hover:text-white shrink-0',
                    isOpen && 'border-neutral-900/30 bg-neutral-900/10 text-neutral-900 shadow-sm dark:border-white/[0.28] dark:bg-white/[0.12] dark:text-white',
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
                        'relative max-w-[580px] rounded-2xl bg-gradient-to-br from-neutral-900/10 to-neutral-900/5 border border-neutral-900/10 px-5 py-3.5 text-neutral-800 text-[0.92rem] leading-relaxed shadow-xl backdrop-blur-sm dark:from-white/[0.12] dark:to-white/[0.05] dark:border-white/[0.14] dark:text-white/85',
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
