// IRyde API calls

$(document).ready(function () {
    //using HTML geolocation get longitude and latidude of current user
    var x = $("display-origin");
    $(document).on("click", "#getPrices", getLocation)

//     function getLocation() {
//         debugger
//         console.log(originlat + originLong)
//         console.log(destinationLat + destinationLong)
//         //if user didnt type in origin location, indicating they want us to use current location then get user location
//         // define userlocation function 
//         if (useUserLocation) {
//             event.preventDefault()
//             if (navigator.geolocation) {
//                 navigator.geolocation.getCurrentPosition(showPosition);
//             } else {
//                 alert("Geolocation is not supported by this browser.");
//             }
//         }
//         console.log(originlat + originlong)
//     }
//     function showPosition(position) {
//         locationEnabled = true
//         var originLat = position.coords.latitude
//         var originLong = position.coords.longitude
//         var x = document.getElementById("display")
//         console.log(lat)
//         x.innerHTML = "<h5>Latitude: " + lat +
//             "<p>Longitude: " + long;

        var queryURL = "https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=" + originLat + "," + originLong + "&destinations=" + destinationLat + "," + destinationLong + "&travelMode=driving&key=AgH4JV1Yd-wI2P3_Pz9KF6UirlGXTyPEHoofBVxRuVBOVJT4IiqbNW9l-sEiTjSB";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (result) {
            console.log(result)
            let distance = result.resourceSets[0].resources[0].results[0].travelDistance
            console.log(distance)

            $("#origin-address").html("<div> Starting at: "+originAddress+" miles")
            $("#destination-address").html("<div> Arriving at: "+destinationAddress+" miles")
            $("#display-destination").html("<div> Distance: "+distance+" miles")
            $("#display-destination").append("<div class='uberDisplay'> Uber: $'"+uberPrice+"'")
            $("#display-destination").append("<div class='lyftDisplay'> Lyft: $'"+lyftPrice+"'")

        }); // end ajax call
    };

    $(".input-origin").focus(function(){
        $(".addressList").css('display','block');
    });

    $(".addressList div").click(function() {
        var inputValue = $('.input-origin');
        var data = $(this).text();
        inputValue.val(data);
    });


    $(".input-destination").focus(function(){
        $(".addressListTwo").css('display','block');
    });


    $(".addressListTwo div").click(function() {
        var inputValue = $('.input-destination');
        var data = $(this).text();
        inputValue.val(data);
    });

    $('.container').children().not('.input-wrapper').click(function(){
        // Hide the item list on body click.
        $(".addressList").css('display', 'none');
        $(".addressListTwo").css('display','none');
    });
});//doc ready closing tag

