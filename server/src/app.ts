import Server from './core/server';

new Server(4000).listen();


// import express from 'express';
// import bodyParser from 'body-parser';

// const app = express();
// app.use(bodyParser.json()); 

// app.get('/', (req, res) => {
//     res.send('Server');
// })

// app.listen(4000, () => { console.log('Server running')});