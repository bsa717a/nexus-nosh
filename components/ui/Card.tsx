import { PropsWithChildren } from 'react';

export function Card({ children, className = '' }: PropsWithChildren<{className?: string}>) {
  return <div className={`bg-white border shadow-sm rounded-2xl ${className}`}>{children}</div>;
}
export function CardContent({ children, className = '' }: PropsWithChildren<{className?: string}>) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}
