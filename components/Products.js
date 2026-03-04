export default function Products({filteredProducts, setViewProduct, searchQuery, handleDelete}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:hidden gap-6">
            {filteredProducts
                .filter(p => p.itemName.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((product) => (
                <div key={product.id} className="bg-white p-4 rounded shadow-md" >
                    <div className="cursor-pointer" onClick={() => setViewProduct(product)} >
                        <h2 className="text-xl font-bold text-gray-600">{product.itemName}</h2>
                        <p className="text-gray-600">Category: {product.category}</p>
                        <p className="text-gray-600">Price: ₦{product.price}</p>
                        <p className="text-gray-600">Quantity: {product.quantity}</p>
                    </div>
                    <button 
                        className="bg-red-600 text-white px-2 py-1 rounded mt-2" 
                        onClick={() => handleDelete(product.id)}
                    >
                        Remove
                    </button>
                </div>

            ))}
        </div>
    );
}