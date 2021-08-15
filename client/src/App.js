import { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

import './App.css';

const NAME_URL = 'http://localhost:4000/characters/';

function App() {
  const [names, setNames] = useState([]);

  const fetchNames = async () => {
    const resp = await axios.get(NAME_URL);
    setNames(resp.data);
    // console.log(resp.data);
  };

  useEffect( () => {
    console.log('app started');
    fetchNames();
  });

  return (
    <div className="App">
      <h1>SWAPI Exercise</h1>
      {/* <pre>{JSON.stringify(names)}</pre> */}
      <SelectName names={names}/>
    </div>
  );
}

function SelectName ({names}) {
  const [selectedValue, setSelectedValue] = useState({});
  const [charDetails, setCharDetails] = useState({});

  const options = names.map(name => ({value: name, label: name}));

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const handleClick = async () => {
    const resp = await axios.get(`${NAME_URL}${selectedValue.value}`);
    // console.log(resp.data);
    setCharDetails(resp.data[0]);

  };

  return (
    <div>
      <h3>Select A Name to View Details</h3>
      {/* <pre>{JSON.stringify(names)}</pre> */}
      <Select options={options} value={selectedValue} onChange={handleChange}/>
      <button onClick={handleClick}>View Details</button>
      <div>
        {/* <pre>{JSON.stringify(charDetails)}</pre> */}
        <ShowDetails characterDetails={charDetails}/>
      </div>
    </div>
  );
}

function ShowDetails({characterDetails}) {
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
