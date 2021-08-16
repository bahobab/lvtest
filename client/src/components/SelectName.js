import {useState} from 'react';
import Select from 'react-select';
import axios from 'axios';

import ShowDetails from './ShowDetails';

import './SelectName.css';

const PEOPLE_URL = 'http://localhost:4000/people/';

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
    <div className="selection-wrapper">
      <h3>Select A Name to View Details</h3>
      <div className="selection">
      <Select className="select-box" options={options} value={selectedValue} isLoading={isLoading} onChange={handleChange}/>
      <button className="select-button" onClick={handleClick} disabled={selectedValue === undefined }>View Details</button>
      </div>
      <div className="details-wrapper">
        {
          fetchingDetails
            ? "Fetching details ..."
            : <ShowDetails characterDetails={charDetails}/>
        }
      </div>
    </div>
  );
}

export default SelectName;