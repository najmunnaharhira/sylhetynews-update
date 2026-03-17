import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB, isDbConnected, getDbInitError } from './config/database.js';
import adminRoutes from './routes/admin.js';
import newsRoutes from './routes/news.js';
import categoryRoutes from './routes/categories.js';
import teamRoutes from './routes/team.js';
import authRoutes from './routes/auth.js';
import opinionRoutes from './routes/opinions.js';
import uploadRoutes from './routes/upload.js';
import passwordRoutes from './routes/passwordRoutes.js';
import setupSwagger from './swagger.js';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Connect to Database (non-fatal if unavailable)
await connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/opinions', opinionRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/password', passwordRoutes);

// Swagger/OpenAPI docs
setupSwagger(app);

// Root helpers so hosted URL doesn't show "Cannot GET /"
app.get('/', (_req, res) => {
  res.json({
    status: 'Backend API is running',
    health: '/api/health',
    docs: {
      news: '/api/news',
      categories: '/api/categories',
      team: '/api/team',
      opinions: '/api/opinions',
      upload: '/api/upload/image',
      adminLogin: '/api/admin/login',
    },
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'Server is running',
    db: {
      connected: isDbConnected(),
      error: getDbInitError(),
    },
  });
});

// Error handling middleware
app.use((err: unknown, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const message = err instanceof Error ? err.message : 'Internal server error';
  const stack = err instanceof Error ? err.stack : undefined;
  if (stack) console.error(stack);
  res.status(500).json({ error: message });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
