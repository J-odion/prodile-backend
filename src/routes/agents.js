const express = require('express');
const authMiddleware = require('../middleware/verifyAuth');
// const authMiddleware = require('../middleware/auth');
// const fs = require('fs');
const { addAgent } = require('../controllers/agents/addAgents');
const { getAllAgents } = require('../controllers/agents/getAllAgent');
const { updateAgent } = require('../controllers/agents/editAgent');
const { deleteAgent } = require('../controllers/agents/deleteAgents');

const router = express.Router();


router.post('/addag', authMiddleware, addAgent);
router.get('/getag', authMiddleware, getAllAgents);
router.put('/updateag/:id', authMiddleware, updateAgent);
router.delete('/deleteag/:id', authMiddleware, deleteAgent);

module.exports = router;
