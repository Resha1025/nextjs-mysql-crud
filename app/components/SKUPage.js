import AddSKU from "./AddSKU";
import SKUList from "./SKUList";

const SKUPage = () => {
    return (
        <div className="container mx-auto bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">SKU List</h1>
                <AddSKU />
            </div>
            <SKUList />
        </div>
    );
};

export default SKUPage;
