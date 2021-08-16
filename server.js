const express = require('express');
const helmet = require('helmet');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const BASE_URL = ' https://swapi.dev/api/people/';
// https://swapi.dev/api/people/?page=2

app.get('/people/:page', async (req, res) => {
  const resp = await axios.get(`${BASE_URL}?page=${req.params.page}`);
  const names = resp.data.results.map(character => character.name);

  // console.log({names, next: resp.data.next})
  res.send({names, next: resp.data.next});
});

app.get('/people/details/:name', async (req, res) => {
  const {name} = req.params;
  // check param validity
  
  const resp = await axios.get(`${BASE_URL}?search=${name}`);
  // console.log(resp.data.results);
  res.send(resp.data.results);
});

// handle 404 route here
app.get('*', (req, res) => {
  res.status(404).send('OOP! You visited the wrong link! Please use the corrent link...')
});

app.listen(4000, () => console.log('server listening on port 4000'));
