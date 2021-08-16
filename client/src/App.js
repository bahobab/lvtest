import { useState, useEffect } from 'react';
import axios from 'axios';

import SelectName from './components/SelectName';

import './App.css';

const PEOPLE_URL = 'http://localhost:4000/people/';
// const NAME_URL = 'http://localhost:4000/characters/';

function App() {
  const [names, setNames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getAllObjects(url, apiObjects = []) {
  // recursuve call to fetch page after page

  if (url === null) {
    return apiObjects;
  }

  // customize timeout to prevent eventual timeout on request
  const resp = await axios.get(url, {timeout: 60 * 1 * 1000});
  const pageObjects = resp.data.names;
  apiObjects = [...apiObjects, ...pageObjects];

  setNames(apiObjects);

  // maybe there's a better way to avoid repeating
  setIsLoading(false);
  let nextUrl;
  if (resp.data.next !== null) {
    const nextPage = resp.data.next.split('page=')[1];
    nextUrl = `${PEOPLE_URL}${nextPage}`;
  } else {
    nextUrl = null;
  }

  return getAllObjects(nextUrl, apiObjects);
}

  useEffect( () => {
    // fetchNames();
    setIsLoading(true)
    getAllObjects(`${PEOPLE_URL}1`);
  }, []);

  return (
    <div className="App">
      <h1>SWAPI Exercise</h1>
      <SelectName isLoading={isLoading} names={names}/>
    </div>
  );
}

export default App;
