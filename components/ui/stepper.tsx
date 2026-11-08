import * as React from 'react';
import { cn } from '../../lib/utils';
import { Check, AlertCircle } from 'lucide-react';

export interface StepItem {
  id: string | number;
  title: string;
  description?: string;
  status: 'completed' | 'active' | 'pending' | 'error';
}

export interface StepperProps {
  steps: StepItem[];
  currentStepIndex?: number;
  onStepClick?: (index: number) => void;
  className?: string;
}

export function Stepper({ steps, currentStepIndex = 0, onStepClick, className }: StepperProps) {
  return (
    <nav aria-label="Progress" className={cn('w-full', className)}>
      <ol className="flex items-center justify-between w-full">
        {steps.map((step, index) => {
          const isCompleted = step.status === 'completed' || index < currentStepIndex;
          const isActive = step.status === 'active' || index === currentStepIndex;
          const isError = step.status === 'error';
          const isPending = !isCompleted && !isActive && !isError;

          return (
            <li
              key={step.id}
              className={cn(
                'relative flex-1 flex flex-col items-center sm:items-start text-center sm:text-left',
                index !== steps.length - 1 &&
                  'after:content-[""] after:w-full after:h-[2px] after:bg-[#E3E7ED] after:inline-block after:absolute after:top-5 after:left-1/2 sm:after:left-10 after:-z-10',
                isCompleted && 'after:bg-[#0F8B8D]'
              )}
            >
              <button
                type="button"
                disabled={!onStepClick || isPending}
                onClick={() => onStepClick?.(index)}
                className={cn(
                  'flex items-center gap-2.5 group cursor-default select-none',
                  onStepClick && !isPending && 'cursor-pointer'
                )}
              >
                <div
                  className={cn(
                    'w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs font-mono transition-all duration-180 z-10 shrink-0 border-2',
                    isCompleted && 'bg-[#0F8B8D] border-[#0F8B8D] text-white',
                    isActive && 'bg-white border-[#0F8B8D] text-[#0F8B8D] ring-4 ring-[#E6F5F5]',
                    isError && 'bg-[#FDEEEE] border-[#C53030] text-[#C53030]',
                    isPending && 'bg-[#EEF1F5] border-[#D9DEE5] text-[#5B6576]'
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  ) : isError ? (
                    <AlertCircle className="w-4 h-4 stroke-[2.5]" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>

                <div className="hidden sm:flex flex-col">
                  <span
                    className={cn(
                      'text-xs font-bold leading-tight',
                      isActive ? 'text-[#0B2545]' : isCompleted ? 'text-[#0F8B8D]' : 'text-[#5B6576]'
                    )}
                  >
                    {step.title}
                  </span>
                  {step.description && (
                    <span className="text-[11px] text-[#A3ACB9]">{step.description}</span>
                  )}
                </div>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
