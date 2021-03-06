import Sentiment from 'sentiment';
import dotenv from 'dotenv';
import * as express from 'express';
import { Request, Response } from "express";
import axios from 'axios';

// var Analyzer = require('natural').SentimentAnalyzer;
// var stemmer = require('natural').PorterStemmer;
// var analyzer = new Analyzer("English", stemmer, "afinn");

// // getSentiment expects an array of strings
// console.log(analyzer.getSentiment(["See", "how", "@PennMedCDH", "are", "using", "Twitter", "data", "to", "understand", "the", "COVID-19", "health", "crisis"]));

dotenv.config();
const token = process.env.BEARER_TOKEN;

class Twitter { // For interacting with the Twitter API to get tweets
    private router: express.Router;
    private sentimentAnalyzer: Sentiment;

    public constructor() {
        this.router = express.Router();
        this.sentimentAnalyzer = new Sentiment();
        this.initializeRoutes();
    }

    private initializeRoutes() : void {
        this.router.get('/sentimentscore/account/:username', this.getRecentTweetsFromAccount.bind(this));
    }

    public getRouter () : express.Router {
        return this.router;
    }

    private analyzeTweet(tweet: string) : Sentiment.AnalysisResult {
        const result : Sentiment.AnalysisResult = this.sentimentAnalyzer.analyze(tweet);
        return result;
    }

    private async getRecentTweetsFromAccount(req: Request, res: Response) : Promise<void> {
        const username = req.params.username;
        const endpoint = 'https://api.twitter.com/2/tweets/search/recent?query=from:' + username;
        try {
            let total: number = 0;
            const twitterResponse = await axios({
                method: 'get',
                url: endpoint,
                headers: {
                    'Authorization' : 'Bearer ' + token,
                }
            })
            const tweets = twitterResponse.data.data;
            const numTweets = tweets.length;
            tweets.forEach((tweet : any) => {
                const analysis : Sentiment.AnalysisResult = this.analyzeTweet(tweet.text);
                total += analysis.score;
            })
            total = total/numTweets;
            res.json({ score: total});
        } catch (err) {
            res.status(500).send("Error: Could not get sentiment score");
        }
    }
}

export default Twitter;