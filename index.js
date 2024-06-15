var map = L.map('map').setView([51.505, -0.09], 17); // lotitute , longitude , zoom level



if(!navigator.geolocation){
    console.log("browser doest support geolocation");
}else{
    setInterval(()=>{       
        navigator.geolocation.getCurrentPosition(getPosition);
        console.log("interval run ")
    } ,3000)
}

var marker;
var circle ;
function getPosition(position){
    const lati = position.coords.latitude;
    const long = position.coords.longitude;
    const acc = position.coords.accuracy;
    

     L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
         maxZoom: 19,
         attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        
        if(marker){map.removeLayer(marker)};
        if(circle) {map.removeLayer(circle)};
        
        marker = L.marker([lati , long]);
          circle = L.circle([lati ,long] , {radius : acc});

       var featureGroup = L.featureGroup([marker , circle]).addTo(map);
    //    map.fitBounds(featureGroup.getBounds()); 
}


