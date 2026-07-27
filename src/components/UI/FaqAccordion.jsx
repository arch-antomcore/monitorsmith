"use client";

import * as React from "react";
import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { Minus, Plus } from "lucide-react";
import { cn } from "../../lib/utils";

export function FaqAccordion({
  data,
  className,
  timestamp = "Atualizado diariamente, 24/7",
  questionClassName,
  answerClassName,
}) {
  const [openItem, setOpenItem] = React.useState(null);

  return (
    <div className={cn("w-full py-2", className)}>
      {timestamp && (
        <div className="mb-6 text-xs font-mono tracking-widest text-white/50 uppercase flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981]" />
          {timestamp}
        </div>
      )}

      <Accordion.Root
        type="single"
        collapsible
        value={openItem || ""}
        onValueChange={(value) => setOpenItem(value)}
      >
        {data.map((item) => (
          <Accordion.Item 
            value={item.id.toString()} 
            key={item.id} 
            className="mb-4"
          >
            <Accordion.Header className="flex">
              <Accordion.Trigger className="flex w-full items-center justify-between gap-x-4 text-left group cursor-pointer focus-visible:outline-none">
                <div
                  className={cn(
                    "relative flex items-center space-x-3 rounded-2xl px-5 py-3.5 transition-all duration-300 border",
                    openItem === item.id.toString() 
                      ? "bg-white/[0.1] text-white border-white/[0.28] shadow-[0_4px_24px_rgba(0,0,0,0.5)]" 
                      : "bg-white/[0.03] hover:bg-white/[0.07] text-white/80 border-white/[0.08] hover:border-white/[0.16]",
                    questionClassName
                  )}
                >
                  {item.icon && (
                    <span
                      className={cn(
                        "absolute -top-3 text-2xl select-none pointer-events-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] z-10",
                        item.iconPosition === "right" ? "-right-2.5" : "-left-2.5"
                      )}
                      style={{
                        transform: item.iconPosition === "right" 
                          ? "rotate(8deg)" 
                          : "rotate(-6deg)",
                      }}
                    >
                      {item.icon}
                    </span>
                  )}
                  <span className="font-medium text-[0.98rem] tracking-tight">{item.question}</span>
                </div>

                <span 
                  className={cn(
                    "flex items-center justify-center w-9 h-9 rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/60 transition-all duration-300 group-hover:border-white/[0.2] group-hover:text-white shrink-0",
                    openItem === item.id.toString() && "border-white/[0.28] bg-white/[0.12] text-white shadow-sm"
                  )}
                >
                  {openItem === item.id.toString() ? (
                    <Minus className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content asChild forceMount>
              <motion.div
                initial="collapsed"
                animate={openItem === item.id.toString() ? "open" : "collapsed"}
                variants={{
                  open: { opacity: 1, height: "auto" },
                  collapsed: { opacity: 0, height: 0 },
                }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="ml-4 mt-2.5 md:ml-8">
                  <div
                    className={cn(
                      "relative max-w-[580px] rounded-2xl bg-gradient-to-br from-white/[0.12] to-white/[0.05] border border-white/[0.14] px-5 py-3.5 text-white/85 text-[0.92rem] leading-relaxed shadow-xl backdrop-blur-sm",
                      answerClassName
                    )}
                  >
                    {item.answer}
                  </div>
                </div>
              </motion.div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
}
