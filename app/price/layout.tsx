import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing & Services',
  description: 'Zeryuz Corp scientific research virtualization and commission tier list.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
