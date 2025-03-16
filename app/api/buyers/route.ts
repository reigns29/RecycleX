import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const buyers = await prisma.buyer.findMany({
            where: { isActive: true },
        });
        return NextResponse.json(buyers);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch buyers' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const buyer = await prisma.buyer.create({
            data: {
                name: data.name,
                userId: data.userId,
                contactInfo: data.phone,
                preferredCategories: data.preferredCategories,
                maxPrice: data.maxPrice,
                bio: data.bio,
                location: data.location,
                latitude: data.latitude,
                longitude: data.longitude,
            },
        });
        return NextResponse.json(buyer);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create buyer' }, { status: 500 });
    }
}