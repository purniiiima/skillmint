import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

export default function ProjectCard({ project, refreshProjects }) {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(project.title);
  const [desc, setDesc] = useState(project.description);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!title || !desc) return toast.error("Please fill in all fields!");
    try {
      setLoading(true);
      await API.put(`/projects/${project._id}`, { title, description: desc });
      toast.success("Project updated successfully!");
      setEditing(false);
      refreshProjects();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update project.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      setLoading(true);
      await API.delete(`/projects/${project._id}`);
      toast.success("Project deleted successfully!");
      refreshProjects();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-xl transition duration-300">
      {editing ? (
        <>
          <input
            className="w-full p-2 mb-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full p-2 mb-2 border rounded"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setEditing(false)}
              className="px-3 py-1 rounded border"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="px-3 py-1 rounded bg-indigo-600 text-white"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </>
      ) : (
        <>
          <h4 className="font-semibold text-lg mb-2">{project.title}</h4>
          <p className="text-gray-600">{project.description}</p>
          <div className="mt-3 flex justify-between items-center">
            <span className="text-sm text-gray-500">{project.status || "In Progress"}</span>
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/projects/${project._id}`)}
                className="text-indigo-600 hover:underline text-sm"
              >
                View
              </button>
              <button
                onClick={() => setEditing(true)}
                className="text-green-600 hover:underline text-sm"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="text-red-600 hover:underline text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
