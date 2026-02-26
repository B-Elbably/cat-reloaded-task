const express = require('express');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const membersRouter = require('./routes/members.route');

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
app.get('/', (req, res) => res.redirect('/members'));
app.use('/members', membersRouter);

// 404
app.use((req, res) => {
    res.status(404).render('error', {
        title: '404',
        message: 'Page not found',
    });
});

// Error handler
app.use((err, req, res, _next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).render('error', {
        title: 'Error',
        message: err.message || 'Internal Server Error',
    });
});

module.exports = app;
