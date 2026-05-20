import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zeryuz Corp',
  description: 'Main mainframe database of Zeryuz Corp., detailing HMV technologies and team bios.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
