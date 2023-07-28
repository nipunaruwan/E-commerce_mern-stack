const express = require('express')
const router = express.Router();
const AdminController = require('../controllers/AdminLoginController')

router.route('/admin')
.post(AdminController.getAdmin)

// router.route('/login')
// .post(UserController.getUser)

module.exports =router;