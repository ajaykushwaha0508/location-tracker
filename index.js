var map = L.map('map').setView([51.505, -0.09], 6); // lotitute , longitude , zoom level



if(!navigator.geolocation){
    console.log("browser doest support geolocation");
}else{
    navigator.geolocation.getCurrentPosition(getPosition);
    setInterval(()=>{       
        navigator.geolocation.getCurrentPosition(getPosition);
        console.log("interval run ")
    } ,10000)
}



var marker;
var circle ;
var count = 0;

const mylocationbtn = document.getElementById("btn");

mylocationbtn.addEventListener("click" , ()=>{
    count = 0;
    navigator.geolocation.getCurrentPosition(getPosition);
})


function getPosition(position){
    const lati = position.coords.latitude;
    const long = position.coords.longitude;
    const acc = position.coords.accuracy;
    

     L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
         maxZoom: 16,
         attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        
        if(marker){map.removeLayer(marker)};
        if(circle) {map.removeLayer(circle)};
        
        marker = L.marker([lati , long]);
          circle = L.circle([lati ,long] , {radius : 30});

        var featureGroup = L.featureGroup([marker , circle]).addTo(map);
        if(count==0){
            map.fitBounds(featureGroup.getBounds()); 
            count++;
        }
    }


