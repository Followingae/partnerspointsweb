import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: { persistSession: false }
  }
);

export async function GET() {
  try {
    // Test database connection using Supabase client
    const { data, error } = await supabase
      .from('admin_users')
      .select('count')
      .limit(1);

    if (error) {
      throw error;
    }

    // Test a simple query
    const { data: timeData, error: timeError } = await supabase
      .rpc('current_timestamp');

    return NextResponse.json({ 
      success: true, 
      message: 'Supabase connection successful',
      tableTest: data !== null ? 'Tables accessible' : 'No data',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Supabase connection error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}