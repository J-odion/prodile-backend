// routes/productiveUnit.js
const express = require('express');
const auth = require('../middleware/verifyAuth');

const { addIPU } = require('../controllers/productiveUnit/individual/addIP');
const { deleteIPU } = require('../controllers/productiveUnit/individual/deleteIP');
const { updateIPU } = require('../controllers/productiveUnit/individual/editIP');
const { getAllIPU } = require('../controllers/productiveUnit/individual/getIP');

const { addCPU } = require('../controllers/productiveUnit/cooperate/addCP');
const { deleteCPU } = require('../controllers/productiveUnit/cooperate/deleteCP');
const { updateCPU } = require('../controllers/productiveUnit/cooperate/editCP');
const { getCPU } = require('../controllers/productiveUnit/cooperate/getCP');

const router = express.Router();

//individual productive unit
router.post('/addIPU', auth, addIPU);
router.get('/getIPU', auth, getAllIPU);
router.put('/editIPU/:id', auth, updateIPU);
router.delete('/deleteIPU/:id', auth, deleteIPU);


//coperate productive unit
router.post('/addCPU', auth, addCPU);
router.get('/getCPU', auth, getCPU);
router.put('/editCPU/:id', auth, updateCPU);
router.delete('/deleteCPU/:id', auth, deleteCPU);


module.exports = router;
