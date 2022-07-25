const express = require('express');
const routerAPI = require('./component/router.js');
const { PORT } = require('./config.js');
const app = express();

app.use(express.json({extended: true}));
app.use(express.urlencoded({extended:true}));

routerAPI(app);

app.use( (err, req, res, next) =>{
  if (err)
  res.status(500).json({
    message: `INTERNAL ERROR: ${err.message}`
  });
});

app.listen(PORT, () =>{
  console.info(`Se conectó al puerto ${PORT}`);
});


