require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const house = require('./app/routes/house');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/houses', house);

app.get('*', function (req, res) {
  res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
