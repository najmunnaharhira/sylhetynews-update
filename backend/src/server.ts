import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import {
  connectDB,
  getDatabaseUnavailablePayload,
  getDbInitError,
  isDatabaseUnavailableError,
  isDbConnected,
} from './config/database.js';
import adminRoutes from './routes/admin.js';
import newsRoutes from './routes/news.js';
import categoryRoutes from './routes/categories.js';
import teamRoutes from './routes/team.js';
import authRoutes from './routes/auth.js';
import opinionRoutes from './routes/opinions.js';
import photocardTemplateRoutes from './routes/photocardTemplates.js';
import uploadRoutes from './routes/upload.js';
import passwordRoutes from './routes/passwordRoutes.js';
import setupSwagger from './swagger.js';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const app = express();
const PORT = process.env.PORT || 5000;
const DEV_ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:8080',
  'http://127.0.0.1:8080',
];

const parseOrigin = (value: string | undefined): string | null => {
  if (!value) {
    return null;
  }

  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
};

const allowedOrigins = new Set(
  [
    ...DEV_ALLOWED_ORIGINS,
    parseOrigin(process.env.FRONTEND_URL),
    parseOrigin(process.env.ADMIN_URL),
  ].filter((origin): origin is string => Boolean(origin))
);

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.has(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS origin not allowed: ${origin}`));
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Connect to Database (non-fatal if unavailable)
void connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/opinions', opinionRoutes);
app.use('/api/photocard-templates', photocardTemplateRoutes);
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
  if (isDatabaseUnavailableError(err)) {
    return res.status(503).json(getDatabaseUnavailablePayload());
  }
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
