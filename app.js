const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const authenticateToken = require('./middleware/authenticateToken');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(methodOverride('_method'));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Default route to render main_page.ejs
app.get('/', (req, res) => {
    res.render('mainpage'); // Render the main_page view
});

// Routes
app.use('/index', authenticateToken, taskRoutes);
app.use('/auth', authRoutes);
app.use('/transactions', transactionRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});