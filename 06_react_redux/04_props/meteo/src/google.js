const googleAPIKey = process.env.REACT_APP_googleAPIKey;

function getCityName(latitude, longitude){
  return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleAPIKey}`)
    .then(result => result.json())
    .then(returnedData => {
      const today = new Date();
      const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
      const result={
        city: returnedData.results[1].address_components[0].long_name,
        country: returnedData.results[1].formatted_address.split(",")[1],
        date: formattedDate
      };
      return result;
    })
    // .then(location => {
    //   addToDatabaseLogs(location.city, location.country, location.date);
    //   return location.city;
    // })
    .catch(error => {
      console.warn("Google API error : " + error);
    })
}

export default getCityName;
