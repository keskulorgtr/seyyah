import { NextResponse } from 'next/server';
import db from '@/lib/db';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

// GET — list landmarks (optional ?countryId=X filter)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const countryId = searchParams.get('countryId');

    let landmarks;
    if (countryId) {
      const stmt = db.prepare('SELECT * FROM ar_landmarks WHERE countryId = ? ORDER BY sortOrder ASC, id ASC');
      landmarks = stmt.all(countryId);
    } else {
      const stmt = db.prepare('SELECT * FROM ar_landmarks ORDER BY sortOrder ASC, id ASC');
      landmarks = stmt.all();
    }

    return NextResponse.json(landmarks);
  } catch (error) {
    console.error('AR Landmarks GET Error:', error);
    return NextResponse.json([], { status: 500 });
  }
}

// POST — create a new landmark
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { countryId, name, nameEn, description, thumbnailUrl, modelUrl } = body;

    if (!countryId || !name || !modelUrl) {
      return NextResponse.json({ error: 'countryId, name, and modelUrl are required' }, { status: 400 });
    }

    // Verify country exists
    const country = db.prepare('SELECT id FROM ar_countries WHERE id = ?').get(countryId);
    if (!country) {
      return NextResponse.json({ error: 'Country not found' }, { status: 404 });
    }

    const maxOrder = db.prepare('SELECT MAX(sortOrder) as maxOrder FROM ar_landmarks WHERE countryId = ?').get(countryId) as { maxOrder: number | null };
    const sortOrder = (maxOrder?.maxOrder ?? -1) + 1;

    const stmt = db.prepare(
      'INSERT INTO ar_landmarks (countryId, name, nameEn, description, thumbnailUrl, modelUrl, sortOrder) VALUES (?, ?, ?, ?, ?, ?, ?)'
    );
    const result = stmt.run(countryId, name, nameEn || null, description || null, thumbnailUrl || null, modelUrl, sortOrder);

    return NextResponse.json({
      id: result.lastInsertRowid,
      countryId, name, nameEn, description, thumbnailUrl, modelUrl, sortOrder
    });
  } catch (error) {
    console.error('AR Landmarks POST Error:', error);
    return NextResponse.json({ error: 'Failed to create landmark' }, { status: 500 });
  }
}

// PATCH — update a landmark
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, name, nameEn, description, thumbnailUrl, modelUrl } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const stmt = db.prepare(`
      UPDATE ar_landmarks SET
        name = COALESCE(?, name),
        nameEn = COALESCE(?, nameEn),
        description = COALESCE(?, description),
        thumbnailUrl = COALESCE(?, thumbnailUrl),
        modelUrl = COALESCE(?, modelUrl)
      WHERE id = ?
    `);
    stmt.run(name || null, nameEn || null, description || null, thumbnailUrl || null, modelUrl || null, id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('AR Landmarks PATCH Error:', error);
    return NextResponse.json({ error: 'Failed to update landmark' }, { status: 500 });
  }
}

// DELETE — remove a landmark and its model file
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    // Get model URL to delete the file
    const landmark = db.prepare('SELECT modelUrl FROM ar_landmarks WHERE id = ?').get(id) as { modelUrl: string } | undefined;
    if (landmark?.modelUrl) {
      const filePath = path.join(process.cwd(), 'public', landmark.modelUrl);
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch { /* file deletion is best-effort */ }
    }

    db.prepare('DELETE FROM ar_landmarks WHERE id = ?').run(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('AR Landmarks DELETE Error:', error);
    return NextResponse.json({ error: 'Failed to delete landmark' }, { status: 500 });
  }
}
