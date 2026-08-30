import { NextResponse } from 'next/server';
import { fetchFromAdmin } from '@/lib/api-helper';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();

    const endpoint = queryString ? `/api/public/pricing?${queryString}` : '/api/public/pricing';

    const data = await fetchFromAdmin(endpoint, {
      next: { revalidate: 60 }
    });

    const plans = data.data?.plans || [];
    return NextResponse.json({ success: true, data: plans });
  } catch (error) {
    console.error('Error proxying to admin API:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}