import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Virtual Invitation Generator',
  description: 'Mass-produce highly customized virtual invitations. Match guest rosters, profile pictures, and custom passcodes instantly.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
