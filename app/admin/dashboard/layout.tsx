import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Axel Zeed administration dashboard.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
