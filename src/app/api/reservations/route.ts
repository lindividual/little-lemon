import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

// const kvUrl = process.env.KV_URL;

async function getReservation(userId: string) {
  return await kv.get(`reservation:${userId}`);
}

async function saveReservation(reservation: any) {
  await kv.set(`reservation:${reservation.userId}`, reservation);
}

async function deleteReservation(userId: string) {
  await kv.del(`reservation:${userId}`);
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const reservation = await getReservation(userId);

    if (!reservation) {
      return NextResponse.json({ error: 'Reservation not found' }, { status: 404 });
    }

    return NextResponse.json({ reservation });
  } catch (error) {
    console.error('Error fetching reservation:', error);
    return NextResponse.json({ error: 'Failed to fetch reservation' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log('API: Received reservation data:', data);

    if (!data.userId) {
      console.error('No userId provided in the request');
      return NextResponse.json({ success: false, message: 'userId is required' }, { status: 400 });
    }

    await saveReservation(data);

    console.log('API: Saved reservation:', data);
    return NextResponse.json({ success: true, reservation: data });
  } catch (error) {
    console.error('API: Error processing reservation:', error);
    return NextResponse.json({ success: false, message: 'Failed to process reservation' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    await deleteReservation(userId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting reservation:', error);
    return NextResponse.json({ error: 'Failed to delete reservation' }, { status: 500 });
  }
}
