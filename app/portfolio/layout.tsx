import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Axel Zeed creative works, designs, HMV virtualizations, and research archives.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
