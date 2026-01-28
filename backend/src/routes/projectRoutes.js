const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { 
  createProject, 
  listProjects, 
  getProject, 
  applyProject, 
  getApplicants, 
  updateProject, 
  deleteProject,
  addComment
} = require('../controllers/projectController');

// Project CRUD
router.post('/', auth, createProject);
router.get('/', listProjects);
router.get('/:id', getProject);
router.put('/:id', auth, updateProject);      
router.delete('/:id', auth, deleteProject);  

// Project Applications & Applicants
router.post('/:id/apply', auth, applyProject);
router.get('/:id/applicants', auth, getApplicants);

// Comments
router.post('/:id/comments', auth, addComment);

module.exports = router;
