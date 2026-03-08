
export default function Header({username, setIsModalOpen, searchQuery, setSearchQuery, router}) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div>
                <h1 className="text-2xl text-gray-400 font-bold mb-2">
                    Welcome Back, {username}
                </h1>
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
           <button
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              onClick={() => {
                localStorage.removeItem("loggedInUser");
                router.push("/welcome");
              }}
            >
              Logout
            </button>
        </div>
    );
}