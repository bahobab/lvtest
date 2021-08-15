import { useState, useEffect } from 'react';
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
      <pre>{JSON.stringify(names)}</pre>
    </div>
  );
}

export default App;
