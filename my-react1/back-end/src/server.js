import express from 'express';
import cors from 'cors';
import "dotenv/config.js";

import articlesRoute from './routes/articles.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/articles', articlesRoute);

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});