import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API, { setAuthToken } from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setAuthToken(token);

    fetchProject();
    fetchApplicants();
  }, [id]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/projects/${id}`);
      setProject(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load project');
    } finally {
      setLoading(false);
    }
  };

  const fetchApplicants = async () => {
    try {
      const res = await API.get(`/projects/${id}/applicants`);
      setApplicants(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleComment = async () => {
    if (!commentText) return toast.error('Enter a comment');
    try {
      const res = await API.post(`/projects/${id}/comments`, { text: commentText });
      setProject(prev => ({ ...prev, comments: res.data }));
      setCommentText('');
      toast.success('Comment added');
    } catch (err) {
      console.error(err);
      toast.error('Failed to add comment');
    }
  };

  if (loading) return <p className="p-6 text-gray-500">Loading...</p>;

  if (!project) return <p className="p-6 text-red-500">Project not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-indigo-600">{project.title}</h2>
        <p className="mt-2 text-gray-700">{project.description}</p>
        <p className="mt-2 text-sm text-gray-500">Status: {project.status}</p>
      </div>

      {/* Applicants */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h3 className="text-xl font-semibold mb-2 text-indigo-600">Applicants</h3>
        {applicants.length === 0 ? (
          <p className="text-gray-500">No applicants yet</p>
        ) : (
          <ul className="list-disc pl-5">
            {applicants.map(a => (
              <li key={a._id}>{a.name} ({a.email})</li>
            ))}
          </ul>
        )}
      </div>

      {/* Comments */}
      <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4">
        <h3 className="text-xl font-semibold mb-2 text-indigo-600">Comments</h3>
        {project.comments.length === 0 ? (
          <p className="text-gray-500">No comments yet</p>
        ) : (
          <ul className="space-y-2">
            {project.comments.map((c, idx) => (
              <li key={idx} className="p-2 border rounded-lg">
                <p className="font-medium">{c.user.name}</p>
                <p className="text-gray-700">{c.text}</p>
                <p className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 flex gap-2">
          <input
            type="text"
            placeholder="Add a comment..."
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            className="flex-1 p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleComment}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
