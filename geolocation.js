 $(document).ready(function(){
  var city, route, subLocality, longCity;

  function displayLocation(latitude,longitude){
    var request = new XMLHttpRequest();

    var method = 'GET';
    var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&sensor=true';
    var async = true;

    request.open(method, url, async);
    request.onreadystatechange = function(){
     if(request.readyState == 4 && request.status == 200){
       var data = JSON.parse(request.responseText);
         alert(request.responseText); // check under which type your city is stored, later comment this line
         var addressComponents = data.results[0].address_components;
         for(i=0;i<addressComponents.length;i++){
          var types = addressComponents[i].types
            // alert(types);
            if(types=="locality,political"){
              city = (addressComponents[i].long_name); // this should be your city, depending on where you are
              console.log(city);
            }
            if(types=="route"){
             route = (addressComponents[i].long_name);
             console.log(route);
           }
           if (types=="political,sublocality,sublocality_level_1") {
             subLocality = (addressComponents[i].long_name);
             console.log(subLocality);
           }
           if (types=="administrative_area_level_2,political") {
             longCity = (addressComponents[i].long_name);
             console.log(longCity);
           }
         }
         $('.city').text(city +",");
         $('.longName').text(route +",");
         $('.locality').text(subLocality +",");
         $('.subLocality').text(longCity);
         if (typeof(Storage) !=="undefined") {
          localStorage.setItem("cc", city);
          // document.getElementById("result1").innerHTML = localStorage.getItem("cc");
          var ncc = localStorage.getItem("cc");
          $("#result1 span").text(ncc);
        }
        else{
          document.getElementById("result").innerHTML = "Your browser does not support this functionality";
        }
      }

    };
    request.send();
  };

  var successCallback = function(position){
   var x = position.coords.latitude;
   var y = position.coords.longitude;
   displayLocation(x,y);

 };


 navigator.geolocation.getCurrentPosition(successCallback);




});

 // var nam = "aditya";

 


