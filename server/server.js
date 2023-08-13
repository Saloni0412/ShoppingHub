import express from 'express';
import data from './data.js';

const app = express();

// This route will return all the products in the data.js file.
app.get('/api/products', (req, res) => {
    res.send(data.products);
});

const port = process.env.PORT || 5000;

// This line listens on port 5000, or the port specified in the PORT environment variable.
app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
});