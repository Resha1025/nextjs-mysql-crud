import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const body = await request.json();

        const { first_name, last_name, mobile_number, city, created_by, user_id, is_active } = body;
    
        // Validate the presence of required fields
        if (!first_name || !last_name || !mobile_number) {
          return NextResponse.json({ error: 'First name, last name, and mobile number are required.' }, { status: 400 });
        }
    
        // Compute full_name
        const full_name = `${last_name}, ${first_name}`;
    
        const newCustomer = await prisma.customers.create({
          data: {
            first_name,
            last_name,
            full_name,
            mobile_number,
            city,
            created_by,
            user_id,
            is_active,
          },
        });
    
        return NextResponse.json(newCustomer, { status: 201 });
    } catch (error) {
        console.error("Error creating customer:", error);
        return NextResponse.error("Internal Server Error", 500);
    }
}

export async function GET() {
    try{
        const customers = await prisma.customers.findMany();
        return NextResponse.json(customers);
    } catch (error) {
        console.error("Error fetching customers:", error);
        return NextResponse.error("Internal Server Error", 500);
    }
}