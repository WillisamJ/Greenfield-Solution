import express from 'express';
import methodOverride from 'method-override'; 
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import path from 'path';
import 'dotenv/config';
import taskRoutes from './routes/auth.js';
import authRoutes from './routes/auth.js';
import  authenticateToken  from './middleware/auth.js';
import transactionRoutes from './routes/index.js';
// Basic Authentication for the Application with task managementand transactions
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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