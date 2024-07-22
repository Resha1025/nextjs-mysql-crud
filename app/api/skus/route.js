import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Handle POST requests to create a new SKU
export async function POST(request) {
    try {
        const body = await request.json();
        const { name, code, unit_price, user_id, is_active, created_by } = body;
    
        // Validate the presence of required fields
        if (!name || !code || unit_price === undefined) {
            return NextResponse.json({ error: 'Name, code, and unit price are required.' }, { status: 400 });
        }
    
        // Create a new SKU
        const newSKU = await prisma.skus.create({
            data: {
                name,
                code,
                unit_price: parseFloat(unit_price),
                user_id,
                is_active,
                created_by,
            },
        });

        console.log(newSKU);
    
        return NextResponse.json(newSKU, { status: 201 });
    } catch (error) {
        console.error("Error creating SKU:", error);
        return NextResponse.error("Internal Server Error", 500);
    }
}

export async function GET() {
    try {
        const skus = await prisma.skus.findMany();
        return NextResponse.json(skus);
    } catch (error) {
        console.error("Error fetching SKUs:", error);
        return NextResponse.error("Internal Server Error", 500);
    }
}
