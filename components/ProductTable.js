export default function ProductTable({filteredProducts, setViewProduct, searchQuery, handleDelete}) {
    return (
        <div className="hidden md:block">
            <table className="w-full border-collapse rounded-xl overflow-hidden shadow-md">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3 text-left text-gray-900">S/N</th>
                        <th className="p-3 text-left text-gray-900">Item Name</th>
                        <th className="p-3 text-left text-gray-900">Quantity</th>
                        <th className="p-3 text-left text-gray-900">Category</th>
                        <th className="p-3 text-left text-gray-900">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts
                        .filter(p => p.itemName.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((product, index) => (
                        <tr
                            key={product.id}
                            className="border-b hover:bg-gray-50 transition cursor-pointer"
                            onClick={() => setViewProduct(product)}
                            >
                            <td className="p-3 text-gray-900">{index + 1}</td>
                            <td className="p-3 text-gray-600">{product.itemName}</td>
                            <td className="p-3 text-gray-600">{product.quantity}</td>
                            <td className="p-3 text-gray-600">{product.category}</td>
                            <td className="p-3">
                            <button className="bg-red-600 text-white px-2 py-1 rounded mt-2" onClick={() => handleDelete(product.id)} >
                                Remove
                            </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}