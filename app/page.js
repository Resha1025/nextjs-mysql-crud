"use client";

import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import CustomerPage from "./components/CustomerPage";
import SKUPage from "./components/SKUPage";

export default function Home() {
    const [hash, setHash] = useState("");

    useEffect(() => {
        const handleHashChange = () => setHash(window.location.hash);
        handleHashChange(); // Set initial hash
        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    const renderContent = () => {
        switch (hash) {
            case "#customers":
                return <CustomerPage />;
            case "#skus":
                return <SKUPage />;
            case "#reports":
                return <p>Reports content goes here.</p>;
            default:
                return <p>Welcome to the dashboard!</p>;
        }
    };

    return (
        <main className="flex h-screen">
            <Sidebar />
            <section className="flex-1 p-6 bg-gray-100 overflow-auto">
                <div className="container mx-auto bg-white rounded-lg shadow-md p-6">
                    {renderContent()}
                </div>
            </section>
        </main>
    );
}
