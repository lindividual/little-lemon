import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'reservations.json');

async function readReservations() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading reservations:', error);
    return [];
  }
}

async function writeReservations(reservations: any[]) {
  await fs.writeFile(dataFilePath, JSON.stringify(reservations, null, 2));
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const reservations = await readReservations();
    const reservation = reservations.find((r: any) => r.userId === userId);

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

    const reservations = await readReservations();
    // 查找是否已存在该用户的预定
    const existingIndex = reservations.findIndex((r: { userId: string }) => r.userId === data.userId);
    
    if (existingIndex !== -1) {
      // 如果存在，更新预定
      reservations[existingIndex] = data;
    } else {
      // 如果不存在，添加新预定
      reservations.push(data);
    }

    // 保存更新后的预定列表
    await writeReservations(reservations);

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
    let reservations = await readReservations();
    reservations = reservations.filter((r: { userId: string }) => r.userId !== userId);
    await writeReservations(reservations);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting reservation:', error);
    return NextResponse.json({ error: 'Failed to delete reservation' }, { status: 500 });
  }
}
