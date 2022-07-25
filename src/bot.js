const ChromeCluster = require('./botLauncher/chromeCluster.js');

const main = async (data, headless) => {
  let chrome = new ChromeCluster([data], headless);
  await chrome.execute();
  return chrome.resultList;
}

module.exports = main;