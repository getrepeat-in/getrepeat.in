import { NextResponse } from 'next/server';
import { fetchFromAdmin } from '@/lib/api-helper';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const data = await fetchFromAdmin(`/api/public/pricing/${id}`, {
      next: { revalidate: 60 }
    });
    
    return NextResponse.json({ success: true, data: data.data });
  } catch (error) {
    console.error('Error proxying to admin API for single plan:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
