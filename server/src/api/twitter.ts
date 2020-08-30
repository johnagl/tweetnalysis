// import request from 'request';
// import Sentiment from 'sentiment';
// import dotenv from 'dotenv';

// var Analyzer = require('natural').SentimentAnalyzer;
// var stemmer = require('natural').PorterStemmer;
// var analyzer = new Analyzer("English", stemmer, "afinn");
// // getSentiment expects an array of strings
// console.log(analyzer.getSentiment(["See", "how", "@PennMedCDH", "are", "using", "Twitter", "data", "to", "understand", "the", "COVID-19", "health", "crisis"]));

// const sentimentAnalyzer : Sentiment = new Sentiment();
// const result : Sentiment.AnalysisResult = sentimentAnalyzer.analyze('See how @PennMedCDH are using Twitter data to understand the COVID-19 health crisis');
// console.log(result);

// dotenv.config();

// const token = process.env.BEARER_TOKEN;
// const endpoint = 'https://api.twitter.com/2/tweets/search/recent?query=from:TwitterDev';



// request({ url: endpoint, json: true, headers : { 'Authorization' : 'Bearer ' + token}}, (error, response) => {
//     if (error) {
//         console.log(error);
//     } else if (response.body.data.length == 0) {
//         console.log('No tweets found for the following user');
//     } else {
//         response.body.data.forEach((tweet : any) => {
//             console.log(tweet.text);
//             console.log(sentimentAnalyzer.analyze(tweet.text));
//         })
//     }
// });
import * as express from 'express';
import { Request, Response } from "express";
class Twitter {
    private router: express.Router;

    public constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    private initializeRoutes() : void {
        this.router.get('/', (req, res) => {
            this.testGet(req, res);
        });
    }

    public getRouter () : express.Router {
        return this.router;
    }

    private testGet(req : Request, res : Response) {
        res.send('api/twitter');
    }
}

export default Twitter;