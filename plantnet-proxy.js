const express = require('express');
const multer = require('multer');
const fetch = require('node-fetch');
const FormData = require('form-data');
const cors = require('cors');
const app = express();
const upload = multer();

app.use(cors());

app.post('/plantnet', upload.single('image'), async (req, res) => {
    const apiKey = '2b103K7gnRMAgSd3jaMbiAw8e';
    const form = new FormData();
    form.append('images', req.file.buffer, { filename: req.file.originalname });
    form.append('organs', req.body.organs || 'flower');

    const url = `https://my-api.plantnet.org/v2/identify/all?include-related-images=false&no-reject=false&nb-results=10&lang=en&api-key=${apiKey}`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: form
        });
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'PlantNet API error', details: err.message });
    }
});

app.listen(3001, () => console.log('Proxy running on http://localhost:3001'));