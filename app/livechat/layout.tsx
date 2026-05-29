import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Live Chat Generator',
  description: 'Practice stream chat virtualization in the Zeryuz Corp custom simulation chamber.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
