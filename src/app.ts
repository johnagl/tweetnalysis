import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express(); 

const token = process.env.BEARER_TOKEN;

app.get('/', (req, res) => {
    res.send('Server');
})

app.listen(5000, () => { console.log('Server running')});