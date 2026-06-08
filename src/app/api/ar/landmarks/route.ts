import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const countryId = searchParams.get('countryId');

    const landmarks = await prisma.arLandmark.findMany({
      where: countryId ? { countryId: Number(countryId) } : undefined,
      orderBy: [
        { sortOrder: 'asc' },
        { id: 'asc' },
      ],
    });

    return NextResponse.json(landmarks);
  } catch (error) {
    console.error('AR Landmarks GET Error:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { countryId, name, nameEn, description, thumbnailUrl, modelUrl } = body;

    if (!countryId || !name || !modelUrl) {
      return NextResponse.json({ error: 'countryId, name, and modelUrl are required' }, { status: 400 });
    }

    const maxOrderLandmark = await prisma.arLandmark.findFirst({
      where: { countryId: Number(countryId) },
      orderBy: { sortOrder: 'desc' },
      select: { sortOrder: true },
    });

    const sortOrder = (maxOrderLandmark?.sortOrder ?? -1) + 1;

    const landmark = await prisma.arLandmark.create({
      data: {
        countryId: Number(countryId),
        name,
        nameEn: nameEn || null,
        description: description || null,
        thumbnailUrl: thumbnailUrl || null,
        modelUrl,
        sortOrder,
      },
    });

    return NextResponse.json(landmark);
  } catch (error) {
    console.error('AR Landmarks POST Error:', error);
    return NextResponse.json({ error: 'Failed to create landmark' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, name, nameEn, description, thumbnailUrl, modelUrl } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const landmark = await prisma.arLandmark.update({
      where: { id: Number(id) },
      data: {
        ...(name !== undefined && { name }),
        ...(nameEn !== undefined && { nameEn }),
        ...(description !== undefined && { description }),
        ...(thumbnailUrl !== undefined && { thumbnailUrl }),
        ...(modelUrl !== undefined && { modelUrl }),
      },
    });

    return NextResponse.json({ success: true, landmark });
  } catch (error) {
    console.error('AR Landmarks PATCH Error:', error);
    return NextResponse.json({ error: 'Failed to update landmark' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const landmark = await prisma.arLandmark.findUnique({
      where: { id: Number(id) },
      select: { modelUrl: true },
    });

    if (landmark?.modelUrl) {
      const filePath = path.join(process.cwd(), 'public', landmark.modelUrl);
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch { /* best-effort deletion */ }
    }

    await prisma.arLandmark.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('AR Landmarks DELETE Error:', error);
    return NextResponse.json({ error: 'Failed to delete landmark' }, { status: 500 });
  }
}
