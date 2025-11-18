import express from 'express';
import { fetchGuardianArticles } from '../services/guardian.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const data = await fetchGuardianArticles();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch articles' });
    }
});

export default router;
