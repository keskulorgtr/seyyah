import { NextResponse } from 'next/server';
import db from '@/lib/db';

export const dynamic = 'force-dynamic';

// GET — list all countries
export async function GET() {
  try {
    const stmt = db.prepare('SELECT * FROM ar_countries ORDER BY sortOrder ASC, id ASC');
    const countries = stmt.all();
    return NextResponse.json(countries);
  } catch (error) {
    console.error('AR Countries GET Error:', error);
    return NextResponse.json([], { status: 500 });
  }
}

// POST — create a new country
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, nameEn, emoji } = body;

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const maxOrder = db.prepare('SELECT MAX(sortOrder) as maxOrder FROM ar_countries').get() as { maxOrder: number | null };
    const sortOrder = (maxOrder?.maxOrder ?? -1) + 1;

    const stmt = db.prepare('INSERT INTO ar_countries (name, nameEn, emoji, sortOrder) VALUES (?, ?, ?, ?)');
    const result = stmt.run(name, nameEn || null, emoji || null, sortOrder);

    return NextResponse.json({ id: result.lastInsertRowid, name, nameEn, emoji, sortOrder });
  } catch (error) {
    console.error('AR Countries POST Error:', error);
    return NextResponse.json({ error: 'Failed to create country' }, { status: 500 });
  }
}

// PATCH — update a country
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, name, nameEn, emoji } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const stmt = db.prepare('UPDATE ar_countries SET name = COALESCE(?, name), nameEn = COALESCE(?, nameEn), emoji = COALESCE(?, emoji) WHERE id = ?');
    stmt.run(name || null, nameEn || null, emoji || null, id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('AR Countries PATCH Error:', error);
    return NextResponse.json({ error: 'Failed to update country' }, { status: 500 });
  }
}

// DELETE — remove a country and its landmarks
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    // Delete associated landmarks first
    db.prepare('DELETE FROM ar_landmarks WHERE countryId = ?').run(id);
    db.prepare('DELETE FROM ar_countries WHERE id = ?').run(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('AR Countries DELETE Error:', error);
    return NextResponse.json({ error: 'Failed to delete country' }, { status: 500 });
  }
}
