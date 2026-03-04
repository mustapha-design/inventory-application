'use client';

import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Footer from '../components/Footer';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Products from '../components/Products';
import ProductTable from '../components/ProductTable';
import UploadModal from '../components/UploadModal';
import ViewProduct from '../components/ViewProduct';
export function InventoryApplication() {
  const searchParams = useSearchParams(); //this is a server component that is used to get the category from the url
  const selectedCategory = searchParams.get('category');
  const router = useRouter();

  const [username, setUsername] = useState(""); 
  const [uploadMode, setUploadMode] = useState("single");
  const [batchFile, setBatchFile] = useState(null);
  const [excelData, setExcelData] = useState([]);
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
  if (typeof window === "undefined") return [];
  const savedProducts = localStorage.getItem("products");
  return savedProducts ? JSON.parse(savedProducts) : [];
});
  /* ✅ LOAD PRODUCTS ONCE */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  /* ✅ SAVE PRODUCTS WHEN THEY CHANGE */
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  /* ✅ AUTH CHECK */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const user = localStorage.getItem("loggedInUser");
    if (!user) {
      router.push("/welcome");
    } else {
      setUsername(user);
    }
  }, [router]);

  const filteredProducts = products.filter((product) => {
    if (selectedCategory && selectedCategory !== 'all') {
      return product.category === selectedCategory;
    }
    return true;
  });

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

    setProducts(prev => [...prev, newProduct]);
    setItemName('');
    setPrice('');
    setQuantity('');
    setCategory('');
    setIsModalOpen(false);
  };

  const handleBatchUpload = () => {
    if (!batchFile) {
      alert("Please select a file first.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(jsonData);
    };
    reader.readAsArrayBuffer(batchFile);
  };

  const handleSaveUpload = () => {
    if (excelData.length === 0) {
      alert("No data to save");
      return;
    }

    const formattedProducts = excelData.map((row) => ({
      id: Date.now() + Math.random(),
      itemName: row["Item Name"],
      quantity: Number(row["Quantity"]),
      category: row["Category"],
      price: 0,
    }));

    setProducts(prev => [...prev, ...formattedProducts]);
    setExcelData([]);
    setBatchFile(null);
    setIsModalOpen(false);
  };

  const handleDownloadFormat = () => {
    const data = [["S/N", "Item Name", "Quantity", "Category"]];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data); 
    XLSX.utils.book_append_sheet(wb, ws, "Products");

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    saveAs(blob, "product_upload_format.xlsx");
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  /* 🔴 IMPORTANT: LOGOUT MUST NOT TOUCH PRODUCTS */
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    router.push("/welcome");
  };

 return (
    <div className="flex min-h-screen bg-gray-100">

      {/* MOBILE HAMBURGER */}
      <button className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded" onClick={() => setIsSidebarOpen(!isSidebarOpen)} >
        ☰
      </button>

      {/* SIDEBAR */}
      <SideBar categories={categories} selectedCategory={selectedCategory} setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />
     
      {/* MAIN */}
      <main className="flex-1 p-6 md:ml-0">

        {/* HEADER */}
        <Header username={username} setIsModalOpen={setIsModalOpen} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        {/* PRODUCTS */}
        <Products filteredProducts={filteredProducts} setViewProduct={setViewProduct} searchQuery={searchQuery} handleDelete={handleDelete} />

        {/* PRODUCT TABLE */}
        <ProductTable filteredProducts={filteredProducts} setViewProduct={setViewProduct} searchQuery={searchQuery} handleDelete={handleDelete} />

      </main>
      {/* MODAL */}
      {isModalOpen && (
        <UploadModal 
          setIsModalOpen={setIsModalOpen} 
          uploadMode={uploadMode} 
          setUploadMode={setUploadMode} 
          handleSubmit={handleSubmit} 
          itemName={itemName} 
          setItemName={setItemName} 
          price={price} 
          setPrice={setPrice} 
          quantity={quantity} 
          setQuantity={setQuantity} 
          category={category} 
          setCategory={setCategory} 
          categories={categories} 
          handleDownloadFormat={handleDownloadFormat} 
          handleBatchUpload={handleBatchUpload} 
          handleSaveUpload={handleSaveUpload} 
          excelData={excelData} 
          setBatchFile={setBatchFile} 
        />
      )}

      {/* VIEW PRODUCT */}
      {viewProduct && (
        <ViewProduct viewProduct={viewProduct} setViewProduct={setViewProduct} handleDelete={handleDelete} />
      )}
      
      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-gray-600 text-lg">Loading...</div>}>
      <InventoryApplication />
    </Suspense>
  );
}
