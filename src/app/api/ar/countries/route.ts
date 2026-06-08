import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const countries = await prisma.arCountry.findMany({
      orderBy: [
        { sortOrder: 'asc' },
        { id: 'asc' },
      ],
    });
    return NextResponse.json(countries);
  } catch (error) {
    console.error('AR Countries GET Error:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, nameEn, emoji } = body;

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const maxOrderCountry = await prisma.arCountry.findFirst({
      orderBy: { sortOrder: 'desc' },
      select: { sortOrder: true },
    });

    const sortOrder = (maxOrderCountry?.sortOrder ?? -1) + 1;

    const country = await prisma.arCountry.create({
      data: {
        name,
        nameEn: nameEn || null,
        emoji: emoji || null,
        sortOrder,
      },
    });

    return NextResponse.json(country);
  } catch (error) {
    console.error('AR Countries POST Error:', error);
    return NextResponse.json({ error: 'Failed to create country' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, name, nameEn, emoji } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const country = await prisma.arCountry.update({
      where: { id: Number(id) },
      data: {
        ...(name !== undefined && { name }),
        ...(nameEn !== undefined && { nameEn }),
        ...(emoji !== undefined && { emoji }),
      },
    });

    return NextResponse.json({ success: true, country });
  } catch (error) {
    console.error('AR Countries PATCH Error:', error);
    return NextResponse.json({ error: 'Failed to update country' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    // Prisma relation `onDelete: Cascade` handles associated landmarks
    await prisma.arCountry.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('AR Countries DELETE Error:', error);
    return NextResponse.json({ error: 'Failed to delete country' }, { status: 500 });
  }
}
