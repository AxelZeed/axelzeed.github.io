import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Ping 'wishes' table for activity signal
    const { data, error } = await supabase.from('wishes').select('id').limit(1);

    if (error) throw error;

    return NextResponse.json({ 
      status: 'OK', 
      message: 'Zeryuz Pulse Detected. Mainframe Active.',
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    return NextResponse.json({ 
      status: 'ERR', 
      message: 'Database connection failed: ' + err.message 
    }, { status: 500 });
  }
}
