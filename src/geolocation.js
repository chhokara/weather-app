export const getPosition = () => {
    if (navigator.geolocation){  
      navigator.geolocation.getCurrentPosition(showGPS);
    } else {  
        //no location found
        alert("Geolocation no Supported")
    }
}

function showGPS(position){
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    localStorage.setItem('latitude65', JSON.stringify(latitude));
    localStorage.setItem('longitude65', JSON.stringify(longitude));
}