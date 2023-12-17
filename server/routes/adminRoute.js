import express from 'express';
import adminAuth from '../controllers/adminAuth.js'
const router = express.Router();


router.get('/login')

router.post("/login", adminAuth.postAdminLogin)
router.post("/logout",adminAuth.postAdminLogout)
router.get("/check", adminAuth.checkAdminLoggedIn)

export default router