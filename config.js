require('dotenv').config();

module.exports = {
  PORT : process.env.PORT,
  URL: process.env.ANGELINA_URL,
  PASSWORD: process.env.PASSWORD_ROOT,
  USERNAME: process.env.USERNAME_ROOT,
}