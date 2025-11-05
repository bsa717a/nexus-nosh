import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'solid'|'outline', size?: 'sm'|'md'|'lg' }
export function Button({ children, className = '', variant='solid', size='md', ...rest }: PropsWithChildren<Props>) {
  const base = 'rounded-xl font-medium transition border';
  const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2', lg: 'px-6 py-3 text-lg' }[size];
  const styles = variant === 'outline'
    ? 'bg-white border-gray-300 hover:bg-gray-50'
    : 'bg-orange-500 text-white border-orange-600 hover:bg-orange-600';
  return <button className={`${base} ${sizes} ${styles} ${className}`} {...rest}>{children}</button>;
}
