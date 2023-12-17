
import express from 'express';
import searchControl from '../controllers/searchControl.js';



const router = express.Router();

router.get('/search/:searchTerm',searchControl.searchTopic)
router.get('/read/:slug',searchControl.pageInfo)

export default router