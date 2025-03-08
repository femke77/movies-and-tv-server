import express from "express";

// import cors from 'cors';

import { fileURLToPath } from "node:url";
import path from "node:path";
import * as cheerio from "cheerio";
import fetch from "node-fetch";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.get(
  "/api/video/tv/:series_id/:season_number/:episode_number",
  async (req, res) => {
    const { series_id, season_number, episode_number } = req.params;
    console.log(series_id, season_number, episode_number);

    try {
      const response = await fetch(
        `https://vidsrc.xyz/embed/tv/${series_id}/${season_number}-${episode_number}`,
        {
          method: "GET",
        }
      );
      const doc = await response.text(); 
      const $ = cheerio.load(doc);
      const iframe = $("iframe").first().prop("outerHTML");
      if (iframe) {  
        res.send(`<!DOCTYPE html>
<html>
<head>
  <title>Series</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body {
      margin: 0;
      padding: 0;
      display: flex;
      height: 100vh;
      width: 100vw;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #000;
    }
    iframe {
      border: none;
      width: 100%;
      height: 100%;
    }
  </style>
</head>
<body>
  ${iframe}
  </body>
  </html>`);
      } else {
        res.status(404).json({ error: "Iframe not found" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Something went wrong" });
    }
  }
);

app.get('/api/video/movie/:movie_id', async (req, res) => {
    const { movie_id } = req.params;
    console.log(movie_id);
    try {
      const response = await fetch(
        `https://vidsrc.xyz/embed/movie/${movie_id}`,
        {
          method: "GET",
        }
      );
        const doc = await response.text();
        const $ = cheerio.load(doc);
        const iframe = $("iframe").first().prop("outerHTML");
        if (iframe) {
          res.send(`<!DOCTYPE html>
<html>
<head>
    <title>Movie</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body {
            margin: 0;
            padding: 0;
            display: flex;
            height: 100vh;
            width: 100vw;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #000;
        }
        iframe {
            border: none;
            width: 100%;
            height: 100%;
        }

    </style>
</head>
<body>
    ${iframe}
</body>
</html>`);
        }
        else {
            res.status(404).json({ error: "Iframe not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Something went wrong" });
    }
}
);













    app.listen(3004);
