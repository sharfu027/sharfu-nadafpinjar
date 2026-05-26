const scrape = require('website-scraper');

const options = {
  urls: ['https://nadafpinjar.com'],
  directory: './nadafpinjar',
};

scrape(options).then((result) => {
    console.log("Website successfully downloaded to ./nadafpinjar");
}).catch((err) => {
    console.error("An error occurred:", err);
});
