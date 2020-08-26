import express from 'express';
import dotenv from 'dotenv';
import request from 'request';

dotenv.config();
const app = express(); 

const token = process.env.BEARER_TOKEN;
const endpoint = 'https://api.twitter.com/2/tweets/search/recent?query=from:TwitterDev';

request({ url: endpoint, json: true, headers : { 'Authorization' : 'Bearer ' + token}}, (error, response) => {
    if (error) {
        console.log(error);
    } else if (response.body.data.length == 0) {
        console.log('No tweets found for the following user');
    } else {
        console.log(response.body);
    }
});


app.get('/', (req, res) => {
    res.send('Server');
})

app.listen(5000, () => { console.log('Server running')});