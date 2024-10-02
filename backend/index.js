const express = require("express");
const bodyParser = require("body-parser");
const { spawn } = require("child_process");
const cors = require("cors");
// const yfinance = require("yahoo-finance");
const yahooFinance = require("yahoo-finance2").default;
const { log } = require("console");
require("dotenv").config(); // Load environment variables from .env file
const { LocalStorage } = require("node-localstorage");
const localStorage = new LocalStorage("./scratch");

const { PythonShell } = require("python-shell");
const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
const newsApiKey = process.env.ALPHA_VANTAGE_NEWS_API_KEY;

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://stock-market-prediction-theta.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("app is working..");
});

app.post("/getStockData", async (req, res) => {
  try {
    const { stockSymbol, startDate, endDate } = req.body;

    console.log(
      `Fetching data for ${stockSymbol} from ${startDate} to ${endDate}`
    );

    const queryOptions = {
      period1: startDate,
      period2: endDate,
      interval: "1d",
    };

    const result = await yahooFinance.chart(stockSymbol, queryOptions);

    console.log("Yahoo Finance Result:", JSON.stringify(result, null, 2));

    if (result.quotes && result.quotes.length > 0) {
      const transformedData = result.quotes.map((quote) => ({
        date: new Date(quote.date).toISOString().split("T")[0],
        open: quote.open,
        high: quote.high,
        low: quote.low,
        close: quote.close,
        volume: quote.volume,
        adjclose: quote.adjclose,
      }));

      console.log("Transformed data:", transformedData);

      res.json({ success: true, data: transformedData });
    } else {
      res.status(404).json({
        success: false,
        error: "No data found for the given symbol and date range",
      });
    }
  } catch (error) {
    console.error("Error fetching stock data:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
      details: error.message,
    });
  }
});
app.post("/getnewsrapidapi", async (req, res) => {
  const axios = require("axios");

  const options = {
    method: "GET",
    url: process.env.NEWS_API,
    headers: {
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
      "X-RapidAPI-Host": process.env.RAPIDAPI_HOST,
    },
  };

  try {
    const response = await axios.request(options);
    res.json({ news: response.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.post("/getnews", async (req, res) => {
  try {
    const apiKey = process.env.FINANCIALMODELAPI; // Replace with your API key
    const page = Math.floor(Math.random() * 10) + 1;

    const apiUrl = `https://financialmodelingprep.com/api/v3/fmp/articles?page=0&size=5`;

    const response = await fetch(apiUrl);

    if (response.ok) {
      const data = await response.json();
      res.status(200).json({ success: true, news: data });
      // console.log(data);
    } else {
      const errorData = await response.json();
      res.status(response.status).json({ success: false, error: errorData });
      console.log(errorData);
    }
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ success: false, error: "Error fetching news" });
  }
});

app.post("/predictstock/:startdate/:enddate/:stocksymbol", async (req, res) => {
  // const { startDate, endDate, stockSymbol } = req.params;
  const startDate = req.params.startdate;
  const endDate = req.params.enddate;
  const stockSymbol = req.params.stocksymbol.replace(".NS", "");

  try {
    const combinedArgs = [startDate, endDate, stockSymbol].join(",");
    // console.log("I am from backend", combinedArgs);
    const pythonProcess = spawn("python", ["get_stockdata.py", combinedArgs]);

    let pythonOutput = "";

    // Listen for data from the Python process (optional)
    pythonProcess.stdout.on("data", (data) => {
      if (data.toString()[0] == "[" && data.toString()[1] == "[") {
        pythonOutput += data.toString();
      }
    });

    // Listen for errors from the Python process (optional)
    pythonProcess.stderr.on("data", (data) => {
      console.error(`Python stderror: ${data}`);
    });

    // When the Python process closes
    pythonProcess.on("close", (code) => {
      if (code === 0) {
        // console.log("Prediction data:", pythonOutput);
        const innerArrayStrings = pythonOutput.slice(2, -2).split("], [");
        const parsedArray = innerArrayStrings.map((inner) =>
          inner.split(",").map(Number)
        );
        // console.log(parsedArray);
        res.json({ success: true, predictionDataInJSON: parsedArray });
      } else {
        res.status(500).send("Error running the Python script");
      }
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/alpha", (req, res) => {
  "use strict";
  var request = require("request");

  var url =
    "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=ved&apikey=" +
    apiKey;

  var url2 =
    "https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=" +
    apiKey;

  var topics = "financial_markets"; // Add more topics as needed

  var url3 =
    "https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=" +
    topics +
    "&apikey=" +
    newsApiKey;

  request.get(
    {
      url: url3,
      json: true,
      headers: { "User-Agent": "request" },
    },
    (err, response, data) => {
      if (err) {
        console.log("Error:", err);
      } else if (response.statusCode !== 200) {
        console.log("Status:", response.statusCode);
      } else {
        // Check if data and bestMatches are defined
        console.log(data);
        res.send(data);
      }
    }
  );
});

app.listen(3001, () => {
  console.log("started on 3001...");
});
