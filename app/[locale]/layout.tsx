import React from 'react';
import type { Metadata } from 'next';
import { AuthProvider } from '../../lib/auth/context';

export const metadata: Metadata = {
  title: 'Finazen - Nền tảng So sánh Tài chính Cá nhân Việt Nam',
  description:
    'Nền tảng so sánh lãi suất vay mua nhà, ô tô, tiêu dùng, gửi tiết kiệm và bảo hiểm độc lập, minh bạch tại Việt Nam. Tuân thủ Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15.',
};

export interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  return (
    <html lang={locale} className="scroll-smooth">
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
