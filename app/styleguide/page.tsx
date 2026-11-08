import React from 'react';
import type { Metadata } from 'next';
import { StyleguideView } from '../../components/styleguide/styleguide-view';

export const metadata: Metadata = {
  title: 'Finazen Design System & Component Styleguide (Admin Only)',
  description: 'Internal design system reference and component state showcase.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function StyleguidePage() {
  return <StyleguideView />;
}
