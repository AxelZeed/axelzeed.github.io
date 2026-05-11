import { Shield } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import { discoverRoutes } from '@/utils/routeDiscovery';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Auto-discover routes
  const publicLinks = discoverRoutes('', '', ['admin', 'api', 'auth', 'login']);
  const adminLinks = discoverRoutes('admin', '/admin', ['dashboard']); // Exclude dashboard as it's the main link

  return (
    <div className="min-h-screen bg-[#020a0c] text-white flex">
      {/* Admin Sidebar */}
      <AdminSidebar 
        userEmail={user.email || ''} 
        publicLinks={publicLinks}
        adminLinks={adminLinks}
      />

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-8 min-h-screen relative">
        {/* Background Decorative HUD */}
        <div className="absolute top-0 right-0 p-8 pointer-events-none opacity-5">
           <Shield size={400} className="text-neon-cyan" />
        </div>
        
        <div className="relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
