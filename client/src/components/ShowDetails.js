import './ShowDetails.css';

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
    <div className="character-details">
      <h3>Details for <span>{name}</span></h3>
      {/* <pre>
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
      </pre> */}
      <table className="details-table">
        <tbody>
        <tr className="details-header">
          <th>Name</th>
          <th>Height</th>
          <th>Mass</th>
          <th>Hair_color</th>
          <th>Skin_color</th>
          <th>Eye_color</th>
          <th>Birth_year</th>
          <th>Gender</th>
        </tr>
        <tr className="details-data">
          <td>{name}</td>
          <td>{height}</td>
          <td>{mass}</td>
          <td>{hair_color}</td>
          <td>{skin_color}</td>
          <td>{eye_color}</td>
          <td>{birth_year}</td>
          <td>{gender}</td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ShowDetails;