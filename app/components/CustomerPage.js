import AddCustomer from "./AddCustomer";
import CustomerList from "./CustomerList";

const CustomerPage = () => {
    return (
        <div className="container mx-auto bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Customer List</h1>
                <AddCustomer />
            </div>
            <CustomerList />
        </div>
    );
};

export default CustomerPage;
