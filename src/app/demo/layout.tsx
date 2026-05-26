import type { Metadata } from 'next';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: '组件演示',
  description: '组件演示页面',
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
