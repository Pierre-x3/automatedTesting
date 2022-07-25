const express = require('express');
const main = require('../../src/bot.js');
const router = express.Router();

router.post('/', add);

async function add(req, res, next){
  let { headless } = req.body;
  main(req.body, headless)
  .then( (response) =>{
    res.send(response);
  })
  .catch(next)
}


module.exports = router;
