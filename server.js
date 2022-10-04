const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const axios = require('axios');
const xml2js = require('xml2js');

app.use(express.json())

app.get('/news', async (req, res) => {
  const response = await axios.get('https://www.meneame.net/rss')
  const xmlText = response.data;
  // transform xml to json
  const feed = await new Promise((resolve, reject) => {
    xml2js.parseString(xmlText, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
  const [channel] = feed.rss.channel;
  // map rss json to our own structure
  const news = channel.item.map((item) => ({
    id: item.title[0]?.replaceAll(' ', '-').toLowerCase(),
    title: item.title[0],
    link: item.link[0],
    pubDate: item.pubDate[0]?.split(' ').slice(1, 4).join(' '), // 
    description: item.description[0],
    image: item["media:thumbnail"]?.[0].$.url,
    category: item["meneame:sub"]?.[0],
    votes: item["meneame:votes"],
  }));
  res.json(news);
});

app.listen(port, () => {
  console.log(`REST server listening on port ${port}`)
})

app.use(express.static('build'));
