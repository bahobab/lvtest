const express = require('express');
const helmet = require('helmet');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const BASE_URL = ' https://swapi.dev/api/people/';

async function getAllObjects(url, apiObjects = []) {
  // recursuve call to fetch page after page

  if (url === null) {
    return apiObjects;
  }

  const resp = await axios.get(url);
  const pageObjects = resp.data.results;
  apiObjects = [...apiObjects, ...pageObjects];
  console.log('>>>next', resp.data.next);
  return getAllObjects(resp.data.next, apiObjects);
}

app.get('/characters', async (req, res) => {
  // const resp = await axios.get(BASE_URL);
  // console.log(resp.data);
  // const names = resp.data.results.map(character => character.name);

  req.setTimeout(60 * 4 * 1000);
  const allCharacters = await getAllObjects(BASE_URL);
  // console.log(allCharacters);
  const names = allCharacters.map(character => character.name);
  res.send(JSON.stringify(names));
}); 

app.get('/characters/:name', async (req, res) => {
  const {name} = req.params;

  // check param validity
  
  const resp = await axios.get(`${BASE_URL}?search=${name}`);
  // console.log(resp.data.results);
  res.send(resp.data.results);
});

// handle 404 route here

app.listen(4000, () => console.log('server listening on port 4000'));
