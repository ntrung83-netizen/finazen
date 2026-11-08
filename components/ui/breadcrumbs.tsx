import * as React from 'react';
import { cn } from '../../lib/utils';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  showHomeIcon?: boolean;
  className?: string;
}

export function Breadcrumbs({ items, showHomeIcon = true, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center text-xs text-[#5B6576]', className)}>
      <ol className="flex items-center space-x-1.5 flex-wrap">
        {showHomeIcon && (
          <li className="inline-flex items-center">
            <a
              href="/"
              className="inline-flex items-center text-[#5B6576] hover:text-[#0F8B8D] transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="sr-only">Trang chủ</span>
            </a>
          </li>
        )}

        {items.map((item, index) => {
          const isLast = index === items.length - 1 || item.current;

          return (
            <li key={index} className="inline-flex items-center gap-1.5">
              {(showHomeIcon || index > 0) && (
                <ChevronRight className="w-3 h-3 text-[#A3ACB9] shrink-0" aria-hidden="true" />
              )}
              {isLast ? (
                <span
                  aria-current="page"
                  className="font-semibold text-[#0B2545] truncate max-w-[200px]"
                >
                  {item.label}
                </span>
              ) : item.href ? (
                <a
                  href={item.href}
                  className="hover:text-[#0F8B8D] transition-colors truncate max-w-[150px]"
                >
                  {item.label}
                </a>
              ) : (
                <span className="text-[#5B6576]">{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
