const {
  USERNAME,
  PASSWORD,
  URL
} = require('../../../config.js');

const login = async (page) => {
  await page.goto(URL);
  await page.type('input[id="name"]', USERNAME);
  await page.type('input[name="password"]', PASSWORD);
  let btnLogin = await page.$('button[name="btnLogin"]');
  btnLogin.click();
  await page.waitForNavigation({
    waitUntil: 'networkidle0',
  });
}

module.exports = login;