import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Submission Form',
  description: 'Submit your virtualization details and request HMV services.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
