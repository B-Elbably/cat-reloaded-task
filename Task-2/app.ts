import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import membersRouter from './routes/members.route.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security - allow inline scripts for our simple app
app.use(
    helmet({
        contentSecurityPolicy: false,
    }),
);

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests',
});
app.use('/api', limiter);

// Middlewares
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req: Request, res: Response) => res.redirect('/members'));
app.use('/members', membersRouter);

// 404
app.use((req: Request, res: Response) => {
    res.status(404).render('error', {
        title: '404',
        message: 'Page not found'
    });
});

// Error handler
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).render('error', {
        title: 'Error',
        message: err.message || 'Internal Server Error'
    });
});

export default app;
