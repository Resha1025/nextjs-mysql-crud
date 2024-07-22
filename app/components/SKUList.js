'use client';

import { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import SKUModal from "./SKUModal";

export default function SKUList() {
    const [skus, setSKUs] = useState([]);
    const [selectedSKU, setSelectedSKU] = useState(null);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        code: "",
        unit_price: "",
        active: true
    });

    useEffect(() => {
        async function fetchSKUs() {
            try {
                const response = await fetch("/api/skus");
                const data = await response.json();
                setSKUs(data);
            } catch (error) {
                console.error("Error fetching skus:", error);
            }
        }

        fetchSKUs();
    }, []);

    const handleEditClick = (sku) => {
        setSelectedSKU(sku);
        setFormData({
            name: sku.name,
            code: sku.code,
            unit_price: sku.unit_price,
            active: sku.is_active
        });
        setOpenModalEdit(true);
    };

    const handleCloseModal = () => {
        setOpenModalEdit(false);
        setSelectedSKU(null);
        setFormData({
            name: "",
            code: "",
            unit_price: "",
            active: true
        });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmitEditSKU = async (e) => {
        e.preventDefault();

        if (!selectedSKU) return;

        const updatedSKU = {
            name: formData.name,
            code: formData.code,
            unit_price: formData.unit_price,
            is_active: formData.active,
        };

        try {
            const response = await fetch(`/api/skus/${selectedSKU.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedSKU),
            });

            if (response.ok) {
                console.log("SKU updated successfully");
                // Refresh the sku list
                const updatedList = await fetch("/api/skus");
                setSKUs(await updatedList.json());
                handleCloseModal(); // Close the modal and clear the form
            } else {
                const errorData = await response.json();
                console.error("Error updating SKU:", errorData);
            }
        } catch (error) {
            console.error("Error updating SKU:", error);
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Code</th>
                        <th>Unit Price</th>
                        <th>Active</th>
                        <th>Image</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {skus.map((sku) => (
                        <tr key={sku.id} className="bg-base-200">
                            <td>{sku.name}</td>
                            <td>{sku.code}</td>
                            <td>{sku.unit_price}</td>
                            <td>
                                <input 
                                    type="checkbox" 
                                    checked={sku.is_active} 
                                    readOnly 
                                />
                            </td>
                            <td>{sku.image}</td>
                            <td>
                                <FiEdit 
                                    cursor="pointer" 
                                    size={25} 
                                    onClick={() => handleEditClick(sku)} 
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedSKU && (
                <SKUModal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                    <form onSubmit={handleSubmitEditSKU} className="flex flex-col gap-4">
                        <h3 className="text-lg font-bold">Edit SKU</h3>
                        <label htmlFor="name" className="flex flex-col gap-1">
                            Name
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="input input-bordered"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
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
                                placeholder="code"
                                value={formData.code}
                                onChange={handleChange}
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
                                value={formData.unit_price}
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
                </SKUModal>
            )}
        </div>
    );
}
