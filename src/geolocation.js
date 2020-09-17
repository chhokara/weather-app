export const getPosition = () => {
    if (navigator.geolocation){  
      navigator.geolocation.getCurrentPosition(storeCoordinates);
    } else {  
        //no location found
        alert("Geolocation no Supported")
    }
}

function storeCoordinates(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    localStorage.setItem('latitude', JSON.stringify(latitude));
    localStorage.setItem('longitude', JSON.stringify(longitude));
}