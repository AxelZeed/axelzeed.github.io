import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { ReviewClient } from './ReviewClient';

export default async function ReviewPage() {
  const supabase = createClient();
  
  const { data: wishes, error } = await supabase
    .from('wishes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <div className="p-12 text-center border-2 border-neon-red/30 bg-neon-red/5">
        <h2 className="text-neon-red font-ethnocentric text-xl mb-4">!! DATA_FETCH_ERROR !!</h2>
        <p className="text-gray-400 font-mono text-sm uppercase tracking-widest">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <ReviewClient initialWishes={wishes || []} />
    </div>
  );
}
