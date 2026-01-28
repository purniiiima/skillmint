import React, { useEffect, useState } from "react";
import API, { setAuthToken } from "../services/api";
import ProjectCard from "../components/ProjectCard";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [creating, setCreating] = useState(false);

  // New states for search & filter
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setAuthToken(token);

    fetchProfile();
    fetchProjects();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/users/me");
      setProfile(res.data);
    } catch (err) {
      console.error(err);
      localStorage.removeItem("token");
      setProfile(null);
      alert("Session expired. Please login again.");
      window.location.href = "/login";
    }
  };

  const fetchProjects = async () => {
    try {
      setLoadingProjects(true);
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingProjects(false);
    }
  };

  const createProject = async () => {
    if (!title || !desc) return toast.error("Please fill in all fields!");
    try {
      setCreating(true);
      await API.post("/projects", { title, description: desc });
      toast.success("Project created successfully!");
      setTitle("");
      setDesc("");
      fetchProjects();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create project.");
    } finally {
      setCreating(false);
    }
  };

  // Filter and search projects
  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="md:col-span-2 space-y-6">
          {/* Create Project Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all">
            <h3 className="text-xl font-semibold mb-4 text-indigo-600">Create Project</h3>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 mb-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Project Title"
            />
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full p-3 mb-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Project Description"
            />
            <button
              onClick={createProject}
              disabled={creating}
              className={`${
                creating
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } text-white px-6 py-2 rounded-xl font-medium transition`}
            >
              {creating ? "Creating..." : "Create"}
            </button>
          </div>

          {/* My Projects */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-2 text-indigo-600">My Projects</h3>

            {/* Search & Filter */}
          <div className="bg-white p-4 rounded-2xl shadow-lg flex flex-col sm:flex-row gap-4 items-center mb-4">
      <input
        type="text"
        placeholder="Search by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full sm:w-1/2 p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="w-full sm:w-1/4 p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="All">All Status</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
        <option value="Pending">Pending</option>
      </select>
    </div>

            {loadingProjects ? (
              <p className="text-gray-500">Loading projects...</p>
            ) : filteredProjects.length === 0 ? (
              <p className="text-gray-500">No projects found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredProjects.map((p) => (
                  <ProjectCard key={p._id} project={p} refreshProjects={fetchProjects} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="bg-white p-6 rounded-2xl shadow-lg space-y-6">
          <div>
            <button
              onClick={() => toast.info("Suggestions coming soon ✨")}
              className="text-indigo-600 hover:underline font-medium"
            >
              Get Suggestions ✨
            </button>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-indigo-600 mb-1">Profile</h3>
            <p className="text-gray-700 font-medium">{profile?.name}</p>
            <p className="text-sm text-gray-500">{profile?.email}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
