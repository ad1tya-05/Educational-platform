import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import Navbar from '../components/Navbar';

const StudentHome = () => {
  const navigate = useNavigate();
  const [docs, setDocs] = useState([]);
  const [filters, setFilters] = useState({ subject: '', classLevel: '', schoolName: '' });
  const [selectedPdf, setSelectedPdf] = useState(null); // For Preview

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  // Combined Search Logic
  useEffect(() => {
    const fetchDocs = async () => {
      try {
        // Create query string: ?subject=Math&classLevel=10
        const params = new URLSearchParams(filters).toString();
        const { data } = await API.get(`/documents?${params}`); 
        setDocs(data);
      } catch {
        console.error("Failed to fetch docs");
      }
    };
    
    // Debounce search to avoid too many API calls while typing
    const timeoutId = setTimeout(() => fetchDocs(), 300);
    return () => clearTimeout(timeoutId);
  }, [filters]);

  return (


<div className="h-screen flex bg-slate-100">

{/* Sidebar */}
<aside className="w-80 bg-white border-r border-slate-200 flex flex-col">

  {/* Header */}
  <div className="h-14 px-6 flex items-center justify-between border-b">
    <h1 className="text-lg font-semibold text-slate-900">
      Student Library
    </h1>
    <button
      onClick={handleLogout}
      className="text-sm text-slate-500 hover:text-slate-900"
    >
      Logout
    </button>
  </div>

  {/* Filters */}
  <div className="p-4 space-y-4 border-b bg-slate-50">
    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
      Filters
    </h3>

    <input
      placeholder="Search by subject"
      className="w-full h-10 px-3 rounded-lg 
           border border-slate-300 
           bg-white 
           text-slate-900 
           placeholder-slate-400
           focus:ring-2 focus:ring-blue-500 
           focus:border-blue-500"
      onChange={(e) =>
        setFilters({ ...filters, subject: e.target.value })
      }
    />

    <input
      placeholder="Search by class"
      className="w-full h-10 px-3 rounded-lg 
           border border-slate-300 
           bg-white 
           text-slate-900 
           placeholder-slate-400
           focus:ring-2 focus:ring-blue-500 
           focus:border-blue-500"
      onChange={(e) =>
        setFilters({ ...filters, classLevel: e.target.value })
      }
    />

    <input
      placeholder="Search by school"
      className="w-full h-10 px-3 rounded-lg 
           border border-slate-300 
           bg-white 
           text-slate-900 
           placeholder-slate-400
           focus:ring-2 focus:ring-blue-500 
           focus:border-blue-500"
      onChange={(e) =>
        setFilters({ ...filters, schoolName: e.target.value })
      }
    />
  </div>

  {/* Document List */}
  <div className="flex-1 overflow-y-auto p-4 space-y-3">
    {docs.length === 0 ? (
      <p className="text-sm text-slate-400 text-center mt-10">
        No documents found
      </p>
    ) : (
      docs.map((doc) => (
        <div
          key={doc._id}
          onClick={() => setSelectedPdf(doc.fileUrl)}
          className={`group rounded-xl border p-4 cursor-pointer transition-all ${
            selectedPdf === doc.fileUrl
              ? 'border-blue-500 bg-blue-50 shadow-sm'
              : 'bg-white hover:shadow-md hover:-translate-y-[1px]'
          }`}
        >
          <h4 className="text-sm font-semibold text-slate-900 group-hover:text-blue-600">
            {doc.title}
          </h4>

          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-slate-500">{doc.subject}</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              {doc.classLevel}
            </span>
          </div>

          <p className="mt-1 text-xs text-slate-400">
            {doc.schoolName}
          </p>
        </div>
      ))
    )}
  </div>
</aside>

{/* Preview Area */}
<main className="flex-1 p-6 bg-gradient-to-br from-slate-100 to-slate-200">
  <div className="h-full rounded-2xl bg-white/80 backdrop-blur border shadow-sm overflow-hidden flex flex-col items-center justify-center p-4">

    {selectedPdf ? (
      <iframe
        key={selectedPdf} // Forces reload when you click a new file
        src={selectedPdf} // Direct link to Cloudinary
        className="w-full h-full rounded-xl border-none"
        title="PDF Preview"
      />
    ) : (
      <div className="text-center max-w-md px-6">
        <div className="mx-auto mb-6 w-20 h-20 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-3xl">
          📘
        </div>
        <h2 className="text-xl font-semibold text-slate-700">
          Ready to study?
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Select a document from the library to start reading.
        </p>
      </div>
    )}

  </div>
</main>
</div>

  );
};

export default StudentHome;