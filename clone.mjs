import scrape from 'website-scraper';

const options = {
  urls: ['https://nadafpinjar.com'],
  directory: './nadafpinjar',
  recursive: true,
  maxRecursiveDepth: 1
};

scrape(options).then((result) => {
    console.log("Website successfully downloaded to ./nadafpinjar");
}).catch((err) => {
    console.error("An error occurred:", err);
});
