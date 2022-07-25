const express = require('express');

const modelRouter = require('./model/model.router.js');

const routerAPI = (app) => {
  const routerV1 = express.Router();
  app.use('/v1/', routerV1);
  routerV1.use('/model', modelRouter);
}

module.exports = routerAPI;