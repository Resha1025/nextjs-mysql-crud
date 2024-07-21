"use client";

const Sidebar = () => {
    return (
        <nav className="w-64 bg-gray-800 text-white h-full flex flex-col p-4">
            <a href="#dashboard" className="py-2 px-4 rounded hover:bg-gray-700">Dashboard</a>
            <a href="#customers" className="py-2 px-4 rounded hover:bg-gray-700">Customers</a>
            <a href="#reports" className="py-2 px-4 rounded hover:bg-gray-700">Reports</a>
        </nav>
    );
};

export default Sidebar;
