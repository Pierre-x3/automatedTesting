const { Cluster } = require('puppeteer-cluster');
const browserFetcher = require('puppeteer').createBrowserFetcher();
const botLauncher = require('./botLauncher.js');

class ChromeCluster {
  
  constructor (testList, headless){
    this.headless = headless;
    this.testList = testList;
    this.localChromiums = '';
    this.executablePath = '';
    this.resultList = [];
  }

  async execute(){
    this.localChromiums = await browserFetcher.localRevisions();
    this.executablePath = browserFetcher.revisionInfo(this.localChromiums[0]).executablePath;
    if (!this.localChromiums.length)
    return console.error('Can\'t find installed Chromium');

    const cluster = await Cluster.launch({
      concurrency: Cluster.CONCURRENCY_CONTEXT,
      maxConcurrency: 1,
      timeout: 86400000,
      puppeteerOptions: {
        headless: this.headless,
        defaultViewport: {width:1920,height:1080},
        args: [
          '--window-size=1920,1040',
          '--disable-dev-shm-usage'
        ],
        executablePath: this.executablePath,
        ignoreDefaultArgs: ["--hide-scrollbars"]
      }
    });

    cluster.on('taskerror', (err, data, willRetry) => {
      if (willRetry) {
        console.warn(`Encountered an error while crawling ${data}. ${err.message}\nThis job will be retried`);
      } else {
        console.error(`Failed to crawl ${data}: ${err.message}`);
      }
    });

    await cluster.task(async ({
      page,
      data: test
    }) => {
      await botLauncher.launcher(page, test).then( result => {
        this.resultList.push(result);
        this.__showList(result);
        console.info(' - Execution of test  was successful');
      }).catch( err => {
        console.error(err);
        console.info(' - Error executing test ');
      });
    });

    this.testList.forEach(test => {
      cluster.queue(test);
    });

    await cluster.idle();
    await cluster.close();
  }

  __showList(result){
    for(let key in result){
      console.log(`${key} => "${result[key]}"`);
    }
  }
  
}

module.exports = ChromeCluster;