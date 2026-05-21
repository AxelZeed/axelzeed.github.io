import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Absurd Lore Randomizer',
  description: 'A high-engagement, slot-machine style text randomizer to generate an absurd virtual identity string.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
