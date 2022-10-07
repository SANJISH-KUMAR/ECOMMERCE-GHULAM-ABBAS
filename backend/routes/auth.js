const express = require('express');
const router = express.Router();

//import registerUser function
const {
    registerUser,
    loginUser,
    logout,
    forgotPassword,
    resetPassword,
    updatePassword,
    getUserProfile,
    updateProfile,
    allUsers,
    getUserDetails,
    updateUser,
    deleteUser,
} = require('../controllers/authController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

//add base route /api/vi (defined in app.js) to /register . ie localhost:4000/api/v1/register
//redirect to authController for registerUser , loginUser , logout function
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/password/forgot').post(forgotPassword);
// put for updating
router.route('/password/reset/:token').put(resetPassword);
router.route('/logout').post(logout);
router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);
router.route('/me/update').put(isAuthenticatedUser, updateProfile);
router
    .route('/admin/users')
    .get(isAuthenticatedUser, authorizeRoles('admin'), allUsers);
router
    .route('/admin/user/:id')
    .get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails)
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser);
module.exports = router;