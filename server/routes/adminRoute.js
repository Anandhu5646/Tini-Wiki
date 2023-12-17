import express from 'express';
import adminAuth from '../controllers/adminAuth.js'
import adminControl from '../controllers/adminControl.js'
import verifyAdmin from '../middleware/verifyAdmin.js';
const router = express.Router();


router.get('/login')

router.post("/login", adminAuth.postAdminLogin)
router.post("/logout",adminAuth.postAdminLogout)
router.get("/check", adminAuth.checkAdminLoggedIn)
router.get("/", adminControl.dashboard)

export default router