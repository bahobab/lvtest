import { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

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

function SelectName ({names, isLoading}) {
  const options = names.map(name => ({value: name, label: name}));
  const [selectedValue, setSelectedValue] = useState(options[0]);
  const [charDetails, setCharDetails] = useState({});
  const [fetchingDetails, setFetchingDetails] = useState(false);


  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const handleClick = async () => {
    setFetchingDetails(true);
    const resp = await axios.get(`${PEOPLE_URL}details/${selectedValue.value}`);
    // console.log(resp.data);
    setCharDetails(resp.data[0]);
    setFetchingDetails(false);

  };

  return (
    <div>
      <h3>Select A Name to View Details</h3>
      <Select options={options} value={selectedValue} isLoading={isLoading} onChange={handleChange}/>
      <button onClick={handleClick} disabled={selectedValue === undefined }>View Details</button>
      <div>
        {
          fetchingDetails
            ? "Fetching details ..."
            : <ShowDetails characterDetails={charDetails}/>
        }
      </div>
    </div>
  );
}

function ShowDetails({characterDetails}) {
  if (Object.keys(characterDetails).length === 0) {
    return 'No Details to Show Please select a Character then click the "Show Details" button'
  }

  const {
    name,
    height,
    mass,
    hair_color,
    eye_color,
    skin_color,
    birth_year,
    gender
  } = characterDetails;

  return (
    <>
      <h3>Details for <span>{name}</span></h3>
      <pre>
        {
          JSON.stringify({
          name,
          height,
          mass,
          hair_color,
          skin_color,
          eye_color,
          birth_year,
          gender
        })
      }
      </pre>
    </>
  );
}

export default App;
