const express = require('express');
const authMiddleware = require('../middleware/verifyAuth');
// const authMiddleware = require('../middleware/auth');
// const fs = require('fs');
const { addResource } = require('../controllers/resources/addResources');
const { getAllResources } = require('../controllers/resources/getRes');
const { updateResource } = require('../controllers/resources/updateRes');
const { deleteResource } = require('../controllers/resources/deleteRes');

const router = express.Router();


router.post('/add', authMiddleware, addResource);
router.get('/', authMiddleware, getAllResources);
router.put('/update/:id', authMiddleware, updateResource);
router.delete('/delete/:id', authMiddleware, deleteResource);

module.exports = router;
