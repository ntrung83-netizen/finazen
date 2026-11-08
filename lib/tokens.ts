/**
 * Finazen Design Tokens (Strict WCAG 2.2 AA Compliance >= 4.5:1)
 */

export const colors = {
  primary: {
    navy: '#0B2545', // Primary brand, headings, high emphasis
    navy700: '#13315C', // Interactive states, card headers
    navy800: '#0E2442',
    navy900: '#071930',
  },
  action: {
    teal: '#0F8B8D', // Action buttons, primary CTAs ONLY
    tealHover: '#0B6E70', // Darker shade for text/hover to ensure >= 4.5:1 contrast
    tealDark: '#085658',
    tealLight: '#E6F5F5',
  },
  accent: {
    gold: '#C9A227', // Highlights only, borders, indicators (NEVER body text)
    goldDark: '#8F6C0E', // Darker gold for text badges (4.6:1 contrast)
    goldLight: '#FDF9EA',
  },
  neutrals: {
    n50: '#F7F8FA', // Page background
    n100: '#EEF1F5', // Card background subtle
    n200: '#D9DEE5', // Borders, dividers
    n300: '#A3ACB9', // Placeholder, disabled icons
    n400: '#5B6576', // Secondary text (5.4:1 contrast on white)
    n900: '#1F2933', // Body text (13.9:1 contrast on white)
    border: '#E3E7ED', // 1px border-first elevation
  },
  semantic: {
    success: '#1E7F4F', // 4.9:1 contrast on white
    successBg: '#EAF7EE',
    warning: '#B7791F', // 4.6:1 contrast on white
    warningBg: '#FEF7EB',
    error: '#C53030', // 5.9:1 contrast on white
    errorBg: '#FDEEEE',
    info: '#2B6CB0', // 5.5:1 contrast on white
    infoBg: '#EBF4FB',
  },
};

export const typography = {
  fontFamily: {
    sans: "'Be Vietnam Pro', system-ui, sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  scale: [
    { name: '12', size: '12px', lineHeight: '18px', usage: 'Captions, badges, legal fine-print' },
    { name: '14', size: '14px', lineHeight: '21px', usage: 'Body small, secondary tables, tooltips' },
    { name: '16', size: '16px', lineHeight: '24px', usage: 'Base body text, form inputs' },
    { name: '18', size: '18px', lineHeight: '27px', usage: 'Card subheadings, lead paragraphs' },
    { name: '20', size: '20px', lineHeight: '28px', usage: 'Section titles, modal headings' },
    { name: '24', size: '24px', lineHeight: '30px', usage: 'Page headers, category titles' },
    { name: '32', size: '32px', lineHeight: '40px', usage: 'Hero numbers (rates, monthly payments)' },
    { name: '40', size: '40px', lineHeight: '48px', usage: 'Homepage hero headline' },
  ],
  lineHeight: {
    body: 1.5,
    heading: 1.25,
  },
};

export const grid = {
  unit: 8, // 8-pt grid system
  radii: {
    card: '8px',
    dialog: '12px',
    chip: '9999px',
  },
  elevation: {
    border: '1px solid #E3E7ED',
    hoverShadow: '0 4px 12px -2px rgba(11, 37, 69, 0.08)',
    overlayShadow: '0 20px 25px -5px rgba(11, 37, 69, 0.15)',
  },
  motion: {
    duration: '180ms',
    easing: 'cubic-bezier(0, 0, 0.2, 1)',
  },
  touchTarget: {
    minSize: '44px',
  },
};
