'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';


export default function Home() {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category');
  
  
  const [viewProduct, setViewProduct] = useState(null);
  const categories = ['Food Stuff', 'Snacks', 'Mobile', 'Clothes'];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  const filteredProducts = products.filter((product) => {
    if (selectedCategory && selectedCategory !== 'all') {
      return product.category === selectedCategory;
    }
    return true;
  });

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!itemName || !price || !quantity || !category) {
      alert('Please fill in all fields');
      return;
    }
    const newProduct = {
      id: Date.now(),
      itemName,
      price: Number(price),
      quantity: Number(quantity),
      category,
    };
    setProducts([...products, newProduct]);
    setItemName('');
    setPrice('');
    setQuantity('');
    setCategory('');
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* MOBILE HAMBURGER */}
      <button className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded" onClick={() => setIsSidebarOpen(!isSidebarOpen)} >
        ☰
      </button>
      {/* SIDEBAR */}
     <aside className={`fixed md:static z-40 top-0 left-0 inset-y-0 w-56 bg-white shadow-md p-6 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 overflow-y-auto`}>
        <h2 className="text-xl font-bold text-gray-400 mb-6">Categories</h2>
        <ul className="space-y-3 text-gray-600">
          {['all', ...categories].map((cat) => (
            <li key={cat} className={`px-2 py-1 rounded-md transition-colors ${ selectedCategory === cat || (!selectedCategory && cat === 'all') ? 'bg-blue-100 text-blue-600 font-semibold' : 'hover:bg-gray-100' }`} >
              <Link href={cat === 'all' ? '?category=all' : `?category=${cat}`} className="block" onClick={() => setIsSidebarOpen(false)} >
                {cat === 'all' ? 'All Items' : cat}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      {/* MAIN */}
      <main className="flex-1 p-6 md:ml-0">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl text-gray-400 font-bold mb-2">Welcome Back, Mustapha </h1>
            <p className="text-gray-600 text-lg">Manage your store inventory</p>
          </div>
          <div className="w-64 mx-4">
            <div className="flex items-center bg-gray-100 rounded-md border border-gray-300 focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-500">
              <input type="search" placeholder="Search products..." className="w-full py-2 pl-4 text-gray-700 bg-transparent focus:outline-none" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => setIsModalOpen(true)} >
            + Add Product
          </button>
        </div>
   <div className="grid grid-cols-1 sm:grid-cols-2 md:hidden gap-6">
  {filteredProducts
    .filter(p => p.itemName.toLowerCase().includes(searchQuery.toLowerCase()))
    .map((product) => (
      <div
          key={product.id}
          className="bg-white p-4 rounded shadow-md cursor-pointer"
          onClick={() => setViewProduct(product)}
        >
        <h2 className="text-xl font-bold text-gray-600">{product.itemName}</h2>
        <p className="text-gray-600">Category: {product.category}</p>
        <p className="text-gray-600">Price: ₦{product.price}</p>
        <p className="text-gray-600">Quantity: {product.quantity}</p>
        <button className="bg-red-600 text-white px-2 py-1 rounded mt-2" onClick={() => handleDelete(product.id)} >
          Remove
        </button>
      </div>
    ))}
</div>

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

      </main>
      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-1/2">
            <h2 className="text-xl font-bold text-gray-600 mb-4">Add Product</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Item Name</label>
                <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} className="w-full p-2 border text-gray-400 border-gray-400 rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-2 border text-gray-400 border-gray-400 rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Quantity</label>
                <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full p-2 border text-gray-400 border-gray-400 rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border text-gray-400 border-gray-400 rounded" >
                  <option value="">Select Category</option>
                  {categories.map(cat => <option key={cat}>{cat}</option>)}
                </select>
              </div>
              <div className="flex justify-end">
                <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded mr-2" onClick={() => setIsModalOpen(false)} >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
{viewProduct && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-80 flex flex-col items-center">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Product Details</h2>

      <p className="mb-2 text-gray-600">
        <strong>Name:</strong> {viewProduct.itemName}
      </p>

      <p className="mb-2 text-gray-600">
        <strong>Quantity:</strong> {viewProduct.quantity}
      </p>

      <p className="mb-4 text-gray-600">
        <strong>Category:</strong> {viewProduct.category}
      </p>

      {/* QR Code */}
      <div className="mb-4">
        <QRCodeSVG
          value={JSON.stringify({
            name: viewProduct.itemName,
            quantity: viewProduct.quantity,
            category: viewProduct.category,
          })}
          size={150}
          includeMargin={true}
        />
      </div>

      <div className="flex justify-between w-full">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={() => setViewProduct(null)}
        >
          Cancel
        </button>

        <button
          className="bg-red-600 text-white px-4 py-2 rounded"
          onClick={() => {
            handleDelete(viewProduct.id);
            setViewProduct(null);
          }}
        >
          Remove
        </button>
      </div>
    </div>
  </div>
)}

      <footer className="fixed bottom-0 left-0 w-full bg-gray-200 py-2 text-center text-sm text-gray-600">
  <p>&copy; 2024 Mustapha Mohammed. All rights reserved.</p>
  <p>
    Contact us: 
    <a href="mailto:Mustysanimuhammed@gmail.com" className="text-blue-600 hover:underline">Mustysanimuhammed@gmail.com</a> | 
    <a href="tel:+2349028747497" className="text-blue-600 hover:underline">+234 902 874 7497</a>
  </p>
</footer>
    </div>
  );
}





