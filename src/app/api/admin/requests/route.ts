import { NextResponse } from 'next/server';
import db from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const stmt = db.prepare('SELECT * FROM requests ORDER BY createdAt DESC');
    const requests = stmt.all();
    return NextResponse.json(requests);
  } catch (error) {
    console.error('Admin API Error:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'ID and status are required' }, { status: 400 });
    }

    const stmt = db.prepare('UPDATE requests SET status = ? WHERE id = ?');
    stmt.run(status, id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin API Error (PATCH):', error);
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
  }
}
