const Project = require('../models/Project');

// Create a project
exports.createProject = async (req, res) => {
  try {
    const { title, description, requiredSkills, offeredSkills } = req.body;
    const project = await Project.create({
      title,
      description,
      requiredSkills,
      offeredSkills,
      owner: req.user._id,
    });
    res.status(201).json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// List all projects with optional filter
exports.listProjects = async (req, res) => {
  try {
    const { skill, q } = req.query;
    const filter = {};
    if (skill) filter.requiredSkills = { $in: [skill] };
    if (q) filter.title = { $regex: q, $options: 'i' };

    const projects = await Project.find(filter).populate(
      'owner',
      'name avatarUrl skillsOffered'
    );
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a project by ID (with comments)
exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('owner', 'name avatarUrl skillsOffered')
      .populate({
        path: 'comments.user',
        select: 'name email avatarUrl',
      });
    if (!project) return res.status(404).json({ message: 'Not found' });
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Apply to a project
exports.applyProject = async (req, res) => {
  try {
    const { proposal } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Not found' });

    project.applicants.push({ user: req.user._id, proposal });
    await project.save();
    res.json({ message: 'Applied' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get applicants (only for owner/admin)
exports.getApplicants = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate(
      'applicants.user',
      'name email avatarUrl skillsOffered'
    );
    if (!project) return res.status(404).json({ message: 'Not found' });

    if (
      project.owner.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    res.json(project.applicants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update project
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const project = await Project.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete project
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add comment to project
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const comment = {
      user: req.user._id,
      text,
      createdAt: new Date(),
    };

    project.comments.push(comment);
    await project.save();

    // Populate comment user data
    const populatedProject = await project.populate({
      path: 'comments.user',
      select: 'name email avatarUrl',
    });

    res.status(201).json(populatedProject.comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
