import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Authenticate with Zeryuz Corp mainframe network.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
