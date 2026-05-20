import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Submission Review',
  description: 'Axel Zeed submission review module.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
