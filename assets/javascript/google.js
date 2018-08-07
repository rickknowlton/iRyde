google.maps.event.addDomListener(window, 'load', initilize);
function initilize() {

    var start = new google.maps.places.Autocomplete(document.getElementById('origin'));
    var end = new google.maps.places.Autocomplete(document.getElementById('destination'));

    google.maps.event.addListener(start, 'place_changed', function () {
        var place = start.getPlace();
        originAddress = place.formatted_address
        // location += "<b>Latitude</b>: " + place.geometry.location.lng() + "<br/>";
        // location += "<b>Longitude</b>: " + place.geometry.location.lat();
        // document.getElementById('display-origin').innerHTML = location;
        // var origin = place.geometry.location.lng() + place.geometry.location.lat()
        originLat  = place.geometry.location.lat()
        originLong = place.geometry.location.lng()
    });

    google.maps.event.addListener(end, 'place_changed', function () {
        var place = end.getPlace();
        destinationAddress = place.formatted_address
        // location += "<b>Latitude</b>: " + place.geometry.location.lng() + "<br/>";
        // location += "<b>Longitude</b>: " + place.geometry.location.lat();
        // document.getElementById('display-destination').innerHTML = location;
        // var destination = place.geometry.location.lng() + place.geometry.location.lat()
        destinationLat  = place.geometry.location.lat()
        destinationLong = place.geometry.location.lng()

    });

};