'use client';

import { useState } from "react";
import NewCustomerModal from "./NewCustomerModal";

const AddCustomer = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mobile, setMobile] = useState("");
    const [city, setCity] = useState("");
    const [active, setActive] = useState(true);

    const handleSubmitNewCustomer = async (e) => {
        e.preventDefault();

        const newCustomer = {
            firstName,
            lastName,
            mobile,
            city,
            active,
        };

        try {
            const response = await fetch('http://localhost:3000/api/customers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCustomer),
            });

            if (response.ok) {
                console.log("New customer added successfully");
                setModalOpen(false); // Close the modal after successful submission
            } else {
                console.error("Error adding new customer");
            }
        } catch (error) {
            console.error("Error adding new customer:", error);
        }
    };

    return (
        <div>
            <button onClick={() => setModalOpen(true)} className="btn">New Customer</button>
            <NewCustomerModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <form onSubmit={handleSubmitNewCustomer} className="flex flex-col gap-4">
                    <h3 className="text-lg font-bold">New Customer</h3>
                    <label className="flex flex-col gap-1">
                        First Name
                        <input
                            type="text"
                            className="input input-bordered"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </label>
                    <label className="flex flex-col gap-1">
                        Last Name
                        <input
                            type="text"
                            className="input input-bordered"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </label>
                    <label className="flex flex-col gap-1">
                        Mobile #
                        <input
                            type="number"
                            className="input input-bordered"
                            placeholder="Mobile #"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            maxLength={10}
                        />
                    </label>
                    <label className="flex flex-col gap-1">
                        City
                        <input
                            type="text"
                            className="input input-bordered"
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </label>
                    <label className="cursor-pointer flex flex-row items-center gap-1">
                        <input
                            type="checkbox"
                            className="checkbox"
                            checked={active}
                            onChange={(e) => setActive(e.target.checked)}
                        />
                        <span className="label-text flex">Active</span>
                    </label>
                    <button type="submit" className="btn">Submit</button>
                </form>
            </NewCustomerModal>
        </div>
    );
}

export default AddCustomer;
