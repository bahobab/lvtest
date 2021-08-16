import { useState, useEffect } from 'react';
import axios from 'axios';

import SelectName from './components/SelectName';

import './App.css';

const PEOPLE_URL = 'http://localhost:4000/people/';
// const NAME_URL = 'http://localhost:4000/characters/';

function App() {
  const [names, setNames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // const fetchNames = async () => {
  //   setIsLoading(true);
  //   const resp = await axios.get(NAME_URL, {timeout: 60 * 4 * 1000});
  //   setNames(resp.data);
  //   setIsLoading(false);
  //   // console.log(resp.data);
  // };

  async function getAllObjects(url, apiObjects = []) {
  // recursuve call to fetch page after page

  if (url === null) {
    return apiObjects;
  }

  // console.log('>>>Fetching', url);
  const resp = await axios.get(url, {timeout: 60 * 1 * 1000});
  const pageObjects = resp.data.names;
  apiObjects = [...apiObjects, ...pageObjects];

  setNames(apiObjects);
  console.log('>>>next', apiObjects);
  let nextUrl;
  if (resp.data.next !== null) {
    const nextPage = resp.data.next.split('page=')[1];
    nextUrl = `${PEOPLE_URL}${nextPage}`;
  } else {
    nextUrl = null;
  }

  console.log('next url:', nextUrl);
  return getAllObjects(nextUrl, apiObjects);
}

  useEffect( () => {
    console.log('app started');
    // fetchNames();
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
