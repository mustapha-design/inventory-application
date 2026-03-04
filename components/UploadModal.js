import { CloudUpload } from 'lucide-react';
export default function UploadModal({
    setIsModalOpen, 
    uploadMode, 
    setUploadMode, 
    handleSubmit, 
    itemName, 
    setItemName, 
    price, 
    setPrice, 
    quantity, 
    setQuantity, 
    category, 
    setCategory, 
    categories, 
    handleDownloadFormat, 
    handleBatchUpload, 
    handleSaveUpload, 
    excelData, 
    setBatchFile
}) {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded shadow-md w-1/2 overflow-hidden">
          <h2 className="text-xl font-bold text-gray-600 mb-4">Add Product</h2>
    
          <div className="flex w-fit items-start p-1 bg-gray-400 rounded-md mb-4">
            <h2
              onClick={() => setUploadMode("single")}
              className={`cursor-pointer px-3 py-1 rounded-md transition ${
                uploadMode === "single"
                  ? "bg-white text-gray-800"
                  : "text-white"
              }`}
            >
              Single upload
            </h2>
    
            <h2
              onClick={() => setUploadMode("batch")}
              className={`cursor-pointer px-3 py-1 rounded-md transition ${
                uploadMode === "batch"
                  ? "bg-white text-gray-800"
                  : "text-white"
              }`}
            >
              Batch Upload
            </h2>
          </div>
    
          {/* SLIDING CONTAINER */}
          <div className="overflow-hidden">
            <div
              className={`flex transition-transform duration-500 ease-in-out ${
                uploadMode === "single"
                  ? "translate-x-0"
                  : "-translate-x-full"
              }`}
            >
              {/* ===== SINGLE UPLOAD FORM (YOUR FORM) ===== */}
              <div className="w-full shrink-0">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Item Name
                    </label>
                    <input
                      type="text"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      className="w-full p-2 border text-gray-400 border-gray-400 rounded"
                    />
                  </div>
    
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Price
                    </label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full p-2 border text-gray-400 border-gray-400 rounded"
                    />
                  </div>
    
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Quantity
                    </label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full p-2 border text-gray-400 border-gray-400 rounded"
                    />
                  </div>
    
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full p-2 border text-gray-400 border-gray-400 rounded"
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
    
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Add Product
                    </button>
                  </div>
                </form>
              </div>
    
             {/* ===== BATCH UPLOAD ===== */}
    <div className="w-full shrink-0 text-gray-800 mx-auto items-center max-h-[60vh] overflow-y-auto">  <button
        className="p-1 px-2 cursor-pointer bg-blue-500 rounded-lg text-white mb-4"
        onClick={handleDownloadFormat}
      >
        Download format
      </button>
    
      <h1 className="mb-2 text-gray-700 font-semibold">
        Upload Batch Products
      </h1>
    
      <div className="border border-dotted border-gray-400 rounded p-5 flex flex-col items-center justify-start text-gray-600">
        <CloudUpload className="w-12 h-12 mb-3 text-gray-500" />
    
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={(e) => setBatchFile(e.target.files[0])}
          className="mb-2"
        />
    
        <p className="text-sm text-gray-500">Browse file to upload</p>
    
        <button
          type="button"
          className="mt-3 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={handleBatchUpload}
        >
          Upload Products
        </button>
      </div>
    
      {/* ✅ TABLE MUST BE HERE */}
      {excelData.length > 0 && (
      <div className="mt-4 overflow-x-auto">
        <table className="w-full border border-gray-300 text-sm">
          <thead className="bg-gray-200">
            <tr>
              {Object.keys(excelData[0]).map((key) => (
                <th key={key} className="border p-2">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
    
          <tbody>
            {excelData.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, i) => (
                  <td key={i} className="border p-2 text-center">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
    
        {/* ✅ SAVE UPLOAD BUTTON */}
        <div className="flex justify-end mt-3">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleSaveUpload}
          >
            Save Upload
          </button>
        </div>
      </div>
    )}
    
    </div>
    
    
    
            </div>
          </div>
          {/* END SLIDE */}
        </div>
      </div>
    );
}