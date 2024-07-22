'use client';

import { useState } from "react";
import SKUModal from "./SKUModal"; 
import { useRouter } from "next/navigation";

const AddSKU = () => {
    const router = new useRouter();
    const [modalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [unitPrice, setUnitPrice] = useState("");
    const [active, setActive] = useState(true);

    const handleSubmitNewSKU = async (e) => {
        e.preventDefault();

        const newSKU = {
            name: name,
            code: code,
            unit_price: unitPrice,
            is_active: active,
            created_by: "admin",
            user_id : 1,
        };

        try {
            const response = await fetch('/api/skus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSKU),
            });

            if (response.ok) {
                console.log("New sku added successfully");
                setModalOpen(false); // Close the modal after successful submission
                // Clear the form fields
                setName("");
                setCode("");
                setUnitPrice("");
                setActive(true);
            } else {
                const errorData = await response.json();
                console.error("Error adding new sku:", errorData);
            }
        } catch (error) {
            console.error("Error adding new sku:", error);
        }

        router.refresh();
    };

    return (
        <div>
            <button onClick={() => setModalOpen(true)} className="btn btn-primary">New SKU</button>
            <SKUModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <form onSubmit={handleSubmitNewSKU} className="flex flex-col gap-4">
                    <h3 className="text-lg font-bold">New SKU</h3>
                    <label htmlFor="name" className="flex flex-col gap-1">
                        Name
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="input input-bordered"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                    <label htmlFor="code" className="flex flex-col gap-1">
                        Code
                        <input
                            type="text"
                            id="code"
                            name="code"
                            className="input input-bordered"
                            placeholder="Code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                        />
                    </label>
                    <label htmlFor="unit_price" className="flex flex-col gap-1">
                        Unit Price
                        <input
                            type="number"
                            id="unit_price"
                            name="unit_price"
                            className="input input-bordered"
                            placeholder="Unit Price"
                            value={unitPrice}
                            onChange={(e) => setUnitPrice(e.target.value)}
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
            </SKUModal>
        </div>
    );
}

export default AddSKU;
