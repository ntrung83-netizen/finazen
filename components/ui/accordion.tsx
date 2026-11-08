'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { ChevronDown } from 'lucide-react';

export interface AccordionItemData {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItemData[];
  defaultOpenId?: string;
  allowMultiple?: boolean;
  className?: string;
}

export function Accordion({ items, defaultOpenId, allowMultiple = false, className }: AccordionProps) {
  const [openIds, setOpenIds] = React.useState<string[]>(defaultOpenId ? [defaultOpenId] : []);

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={cn('divide-y divide-[#E3E7ED] rounded-[8px] border border-[#E3E7ED] bg-white', className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);

        return (
          <div key={item.id} className="group">
            <h3>
              <button
                type="button"
                onClick={() => !item.disabled && toggle(item.id)}
                disabled={item.disabled}
                aria-expanded={isOpen}
                className={cn(
                  'flex w-full items-center justify-between py-4 px-5 text-left text-sm font-semibold text-[#0B2545] transition-all duration-180 ease-out hover:bg-[#F7F8FA] focus-visible:outline-2 focus-visible:outline-[#0F8B8D] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 select-none',
                  isOpen && 'bg-[#F7F8FA]/60 text-[#0F8B8D]'
                )}
              >
                <span>{item.title}</span>
                <ChevronDown
                  className={cn(
                    'w-4 h-4 text-[#5B6576] transition-transform duration-180 shrink-0 ml-2',
                    isOpen && 'rotate-180 text-[#0F8B8D]'
                  )}
                />
              </button>
            </h3>
            {isOpen && (
              <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-[#5B6576] leading-relaxed animate-in fade-in-50 duration-180">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
