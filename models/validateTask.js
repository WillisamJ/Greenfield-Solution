// Middleware setup
// this middleware validates the task title before saving it to the database
const validateTask = (req, res, next) => {
    const { title } = req.body;
    if (!title || title.length < 3) {
        return res.status(400).json({ error: 'Title is required' });
    }
    next();
};

export { validateTask }; // Export the validateTask function