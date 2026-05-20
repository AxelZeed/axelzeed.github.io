import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Zeryuz Corp virtualization terms, licensing agreements, and usage policy.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
