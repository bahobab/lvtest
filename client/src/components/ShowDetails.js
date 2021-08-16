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

export default ShowDetails;