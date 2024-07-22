'use client';

import { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import NewCustomerModal from "./NewCustomerModal";

export default function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        mobile: "",
        city: "",
        active: true
    });

    useEffect(() => {
        async function fetchCustomers() {
            try {
                const response = await fetch("/api/customers");
                const data = await response.json();
                setCustomers(data);
            } catch (error) {
                console.error("Error fetching customers:", error);
            }
        }

        fetchCustomers();
    }, []);

    const handleEditClick = (customer) => {
        setSelectedCustomer(customer);
        setFormData({
            firstName: customer.first_name,
            lastName: customer.last_name,
            mobile: customer.mobile_number,
            city: customer.city,
            active: customer.is_active
        });
        setOpenModalEdit(true);
    };

    const handleCloseModal = () => {
        setOpenModalEdit(false);
        setSelectedCustomer(null);
        setFormData({
            firstName: "",
            lastName: "",
            mobile: "",
            city: "",
            active: true
        });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === 'mobile') {
            // Allow only numeric input
            const numericValue = value.replace(/[^0-9]/g, '');
            setFormData({
                ...formData,
                [name]: numericValue
            });
        } else {
            setFormData({
                ...formData,
                [name]: type === "checkbox" ? checked : value
            });
        }
    };

    const handleSubmitEditCustomer = async (e) => {
        e.preventDefault();

        if (!selectedCustomer) return;

        const updatedCustomer = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            mobile_number: formData.mobile,
            city: formData.city,
            is_active: formData.active,
        };

        try {
            const response = await fetch(`/api/customers/${selectedCustomer.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedCustomer),
            });

            if (response.ok) {
                console.log("Customer updated successfully");
                // Refresh the customer list
                const updatedList = await fetch("/api/customers");
                setCustomers(await updatedList.json());
                handleCloseModal(); // Close the modal and clear the form
            } else {
                const errorData = await response.json();
                console.error("Error updating customer:", errorData);
            }
        } catch (error) {
            console.error("Error updating customer:", error);
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Mobile Number</th>
                        <th>City</th>
                        <th>Active</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.id} className="bg-base-200">
                            <td>{customer.full_name}</td>
                            <td>{customer.mobile_number}</td>
                            <td>{customer.city}</td>
                            <td>
                                <input 
                                    type="checkbox" 
                                    checked={customer.is_active} 
                                    readOnly 
                                />
                            </td>
                            <td>
                                <FiEdit 
                                    cursor="pointer" 
                                    size={25} 
                                    onClick={() => handleEditClick(customer)} 
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedCustomer && (
                <NewCustomerModal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                    <form onSubmit={handleSubmitEditCustomer} className="flex flex-col gap-4">
                        <h3 className="text-lg font-bold">Edit Customer</h3>
                        <label htmlFor="firstName" className="flex flex-col gap-1">
                            First Name
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                className="input input-bordered"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label htmlFor="lastName" className="flex flex-col gap-1">
                            Last Name
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                className="input input-bordered"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label htmlFor="mobile" className="flex flex-col gap-1">
                            Mobile #
                            <input
                                type="text"
                                id="mobile"
                                name="mobile"
                                className="input input-bordered"
                                placeholder="Mobile #"
                                value={formData.mobile}
                                onChange={handleChange}
                                maxLength={10}
                                required
                            />
                        </label>
                        <label htmlFor="city" className="flex flex-col gap-1">
                            City
                            <input
                                type="text"
                                id="city"
                                name="city"
                                className="input input-bordered"
                                placeholder="City"
                                value={formData.city}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label htmlFor="active" className="cursor-pointer flex flex-row items-center gap-1">
                            <input
                                type="checkbox"
                                id="active"
                                name="active"
                                className="checkbox"
                                checked={formData.active}
                                onChange={handleChange}
                            />
                            <span className="label-text">Active</span>
                        </label>
                        <button type="submit" className="btn">Submit</button>
                        <button 
                            type="button" 
                            className="btn btn-secondary" 
                            onClick={handleCloseModal}
                        >
                            Cancel
                        </button>
                    </form>
                </NewCustomerModal>
            )}
        </div>
    );
}
