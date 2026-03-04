import Link from 'next/link';
export default function SideBar({categories, selectedCategory, setIsSidebarOpen, isSidebarOpen}) {
    return (
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
    );
}