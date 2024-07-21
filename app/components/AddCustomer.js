'use client';

import { useState } from "react";
import NewCustomerModal from "./NewCustomerModal";
import { useRouter } from "next/navigation";

const AddCustomer = () => {
    const router = new useRouter();
    const [modalOpen, setModalOpen] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mobile, setMobile] = useState("");
    const [city, setCity] = useState("");
    const [active, setActive] = useState(true);

    const handleSubmitNewCustomer = async (e) => {
        e.preventDefault();

        const newCustomer = {
            first_name: firstName,
            last_name: lastName,
            mobile_number: mobile,
            city: city,
            is_active: active,
        };

        try {
            const response = await fetch('/api/customers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCustomer),
            });

            if (response.ok) {
                console.log("New customer added successfully");
                setModalOpen(false); // Close the modal after successful submission
                // Clear the form fields
                setFirstName("");
                setLastName("");
                setMobile("");
                setCity("");
                setActive(true);
            } else {
                const errorData = await response.json();
                console.error("Error adding new customer:", errorData);
            }
        } catch (error) {
            console.error("Error adding new customer:", error);
        }

        router.refresh();
    };

    return (
        <div>
            <button onClick={() => setModalOpen(true)} className="btn btn-primary">New Customer</button>
            <NewCustomerModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <form onSubmit={handleSubmitNewCustomer} className="flex flex-col gap-4">
                    <h3 className="text-lg font-bold">New Customer</h3>
                    <label htmlFor="firstName" className="flex flex-col gap-1">
                        First Name
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            className="input input-bordered"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
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
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
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
                            value={mobile}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d*$/.test(value)) {
                                    setMobile(value);
                                }
                            }}
                            maxLength={10}
                            pattern="\d*"
                            title="Please enter a valid mobile number"
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
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </label>
                    <label htmlFor="active" className="cursor-pointer flex flex-row items-center gap-1">
                        <input
                            type="checkbox"
                            id="active"
                            name="active"
                            className="checkbox"
                            checked={active}
                            onChange={(e) => setActive(e.target.checked)}
                        />
                        <span className="label-text">Active</span>
                    </label>
                    <button type="submit" className="btn">Submit</button>
                </form>
            </NewCustomerModal>
        </div>
    );
}

export default AddCustomer;
