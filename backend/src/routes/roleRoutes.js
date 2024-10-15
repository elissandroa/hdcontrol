const express = require('express');

const RoleController = require('../controllers/roleController');

const router = express.Router();


router.post('/roles', RoleController.postRoleController);
router.get('/roles', RoleController.getRoleController);




module.exports = router