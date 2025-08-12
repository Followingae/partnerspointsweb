import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    // Simple query to test connection
    const result = await db.execute('SELECT NOW() as current_time');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database connected successfully',
      timestamp: result.rows?.[0] || result
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}