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

  const options = names.map(name => ({value: name, label: name}));

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <div>
      <h3>Select A Name to View Details</h3>
      {/* <pre>{JSON.stringify(names)}</pre> */}
      <Select options={options} value={selectedValue} onChange={handleChange}/>

    </div>
  );
}

export default App;
