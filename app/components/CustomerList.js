import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function CustomerList() {
    const customers = await prisma.customers.findMany();

    console.log(customers);

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Mobile Number</th>
                    <th>City</th>
                    <th>Active</th>
                </tr>
                </thead>
                <tbody>
                {customers.map(customer => (
                    <tr key={customer.id} className="bg-base-200">
                        <td>{customer.full_name}</td>
                        <td>{customer.mobile_number}</td>
                        <td>{customer.city}</td>
                        <td>{customer.is_active}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

