import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  // These use the ENV variables you added to Vercel
  const supabase = createClient(
    process.env.SUPABASE_URL, 
    process.env.SUPABASE_ANON_KEY
  );

  // Ping the database to keep it awake
  const { data, error } = await supabase.from('wishes').select('id').limit(1);

  if (error) {
    return res.status(500).json({ status: 'ERR', message: error.message });
  }

  return res.status(200).json({ status: 'OK', message: 'Zeryuz Pulse Detected. Mainframe Active.' });
}