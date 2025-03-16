import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const itemId = searchParams.get('item_id');
    const radius = Number(searchParams.get('radius')) || 10;

    if (!itemId) {
      return NextResponse.json(
        { error: 'Item ID is required' },
        { status: 400 }
      );
    }

    const item = await prisma.item.findUnique({
      where: { id: itemId },
    });

    if (!item) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }

    // Find buyers within radius and matching preferences
    const buyers = await prisma.buyer.findMany({
      where: {
        isActive: true,
        preferredCategories: {
          has: item.category,
        },
        maxPrice: {
          gte: item.estimatedPrice,
        },
        // In a real implementation, we would use PostGIS for proper geospatial queries
        // This is a simplified version
        AND: [
          {
            latitude: {
              gte: item.latitude! - radius/111,
              lte: item.latitude! + radius/111,
            },
          },
          {
            longitude: {
              gte: item.longitude! - radius/111,
              lte: item.longitude! + radius/111,
            },
          },
        ],
      },
    });

    return NextResponse.json(buyers);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to find matching buyers' },
      { status: 500 }
    );
  }
}