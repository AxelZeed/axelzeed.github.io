// api/heartbeat.js
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  // FAILSAFE: Check if variables actually exist
  if (!url || !key) {
    return res.status(500).json({ 
      status: 'ERR', 
      message: 'Neural Keys Missing. Check Vercel Environment Variables.' 
    });
  }

  try {
    const supabase = createClient(url, key);

    // Ping 'wishes' table for activity signal
    const { data, error } = await supabase.from('wishes').select('id').limit(1);

    if (error) throw error;

    return res.status(200).json({ 
      status: 'OK', 
      message: 'Zeryuz Pulse Detected. Mainframe Active.',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    return res.status(500).json({ 
      status: 'ERR', 
      message: 'Database connection failed: ' + err.message 
    });
  }
}