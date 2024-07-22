import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request, { params }) {
    try {
        const id = parseInt(params.id);
        const body = await request.json();

        const { name, code, unit_price, userId, isActive } = body;

        // Validate the presence of required fields
        if (!name || !code || unit_price === undefined) {
            return NextResponse.json({ error: 'Name, code, and unit price are required.' }, { status: 400 });
        }

        const updatedSKU = await prisma.skus.update({
            where: { id: id },
            data: {
                name,
                code,
                unit_price: parseFloat(unit_price),
                user_id: userId,
                is_active: isActive,
            },
        });

        return NextResponse.json(updatedSKU, { status: 200 });
    } catch (error) {
        console.error('Error updating SKU:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
