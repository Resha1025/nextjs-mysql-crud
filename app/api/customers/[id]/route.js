import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request, { params }) {
    try {
      const id = parseInt(params.id);
      const body = await request.json();
  
      const { first_name, last_name, mobile_number, city, user_id, is_active } = body;
  
      // Validate the presence of required fields
      if (!first_name || !last_name || !mobile_number) {
        return NextResponse.json({ error: 'First name, last name, and mobile number are required.' }, { status: 400 });
      }
  
      // Compute full_name
      const full_name = `${last_name}, ${first_name}`;
  
      const updatedCustomer = await prisma.customers.update({
        where: { id: id },
        data: {
          first_name,
          last_name,
          full_name,
          mobile_number,
          city,
          user_id,
          is_active,
        },
      });
  
      return NextResponse.json(updatedCustomer, { status: 200 });
    } catch (error) {
      console.error('Error updating Customer:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }

  export async function DELETE(request, { params }) {
    try {
      const id = parseInt(params.id);
  
      const deletedCustomer = await prisma.customers.delete({
        where: { id: id },
      });
  
      return NextResponse.json(deletedCustomer, { status: 200 });
    } catch (error) {
      console.error('Error deleting customer:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }