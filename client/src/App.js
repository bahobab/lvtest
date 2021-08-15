import { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

import './App.css';

const NAME_URL = 'http://localhost:4000/characters/';

function App() {
  const [names, setNames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNames = async () => {
    setIsLoading(true);
    const resp = await axios.get(NAME_URL);
    setNames(resp.data);
    setIsLoading(false);
    // console.log(resp.data);
  };

  useEffect( () => {
    console.log('app started');
    fetchNames();
  }, []);

  return (
    <div className="App">
      <h1>SWAPI Exercise</h1>
      {/* <pre>{JSON.stringify(names)}</pre> */}
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
    const resp = await axios.get(`${NAME_URL}${selectedValue.value}`);
    // console.log(resp.data);
    setCharDetails(resp.data[0]);
    setFetchingDetails(false);

  };

  return (
    <div>
      <h3>Select A Name to View Details</h3>
      {/* <pre>{JSON.stringify(names)}</pre> */}
      <Select options={options} value={selectedValue} isLoading={isLoading} onChange={handleChange}/>
      <button onClick={handleClick} disabled={selectedValue === undefined }>View Details</button>
      <div>
        {/* <pre>{JSON.stringify(charDetails)}</pre> */}
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
      {/* <pre>{JSON.stringify(character)}</pre> */}
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
