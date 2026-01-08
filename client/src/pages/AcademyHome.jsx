import { useState } from 'react';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AcademyHome = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [meta, setMeta] = useState({ title: '', subject: '', classLevel: '', schoolName: '' });
  const [loading, setLoading] = useState(false);
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Please select a PDF file");

    const formData = new FormData();
    formData.append('file', file);
    Object.keys(meta).forEach(key => formData.append(key, meta[key]));

    try {
      setLoading(true);
      await API.post('/upload', formData);// {
        // headers: { 'Content-Type': 'multipart/form-data' }
    //   });
      toast.success('Document uploaded successfully!');
      setMeta({ title: '', subject: '', classLevel: '', schoolName: '' });
      setFile(null);
    } catch (err) {
      toast.error('Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (



    <div className="min-h-screen bg-slate-100">

    {/* Top Bar */}
    <header className="h-14 bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <h1 className="text-lg font-semibold text-slate-900">
          Academy Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="text-sm text-slate-500 hover:text-slate-900"
        >
          Logout
        </button>
      </div>
    </header>

    {/* Content */}
    <main className="max-w-3xl mx-auto px-6 py-10">
      <div className="bg-white rounded-2xl border shadow-sm">

        {/* Card Header */}
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-slate-900">
            Upload Study Material
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Upload PDFs with accurate details so students can easily find them.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleUpload} className="p-6 space-y-6">

          {/* Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Document Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Laws of Motion"
                value={meta.title}
                onChange={(e) =>
                  setMeta({ ...meta, title: e.target.value })
                }
                className="w-full h-10 px-3 rounded-lg border border-slate-300 text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                required
                placeholder="Physics"
                value={meta.subject}
                onChange={(e) =>
                  setMeta({ ...meta, subject: e.target.value })
                }
                className="w-full h-10 px-3 rounded-lg border border-slate-300 text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Class / Grade
              </label>
              <input
                type="text"
                required
                placeholder="Class 9"
                value={meta.classLevel}
                onChange={(e) =>
                  setMeta({ ...meta, classLevel: e.target.value })
                }
                className="w-full h-10 px-3 rounded-lg border border-slate-300 text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                School Name
              </label>
              <input
                type="text"
                required
                placeholder="ABC Public School"
                value={meta.schoolName}
                onChange={(e) =>
                  setMeta({ ...meta, schoolName: e.target.value })
                }
                className="w-full h-10 px-3 rounded-lg border border-slate-300 text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Upload PDF
            </label>

            <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center">
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="block w-full text-sm text-slate-600"
              />

              {file && (
                <p className="mt-2 text-sm text-green-600">
                  Selected: {file.name}
                </p>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              disabled={loading}
              className={`w-full h-11 rounded-lg text-sm font-medium text-white transition ${
                loading
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Uploading...' : 'Upload Document'}
            </button>
          </div>

        </form>
      </div>
    </main>
  </div>
  );
};

export default AcademyHome;