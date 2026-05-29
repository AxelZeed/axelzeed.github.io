import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Debut',
  description: 'Axel Zeed debut information, HMV tech virtualization, and streams.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
