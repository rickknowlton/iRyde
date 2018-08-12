// IRyde API calls

$(document).ready(function () {

    $(document).on("click", "#getPrices", function () {
        event.preventDefault()
        $(".results").empty()
        var queryURL = "https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=" + originLat + "," + originLong + "&destinations=" + destinationLat + "," + destinationLong + "&travelMode=driving&key=AgH4JV1Yd-wI2P3_Pz9KF6UirlGXTyPEHoofBVxRuVBOVJT4IiqbNW9l-sEiTjSB";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (result) {
            console.log(result)
            distance = ((result.resourceSets[0].resources[0].results[0].travelDistance)*0.621371).toFixed(2)
            tripTime = (result.resourceSets[0].resources[0].results[0].travelDuration).toFixed()
            console.log(distance)

            var InitialChargeLyft = 1.20;
            var costPerMileLyft = 1.35;
            var ServiceFeeLyft = 2.45;
            var MinimumFareLyft = 6.45;

            var InitialChargeUber = 1.20;
            var costPerMileUber = 1.50;
            var ServiceFeeUber = 2.05;
            var MinimumFareUber = 7.26;

            var lyftPrice = InitialChargeLyft + ServiceFeeLyft + (distance * costPerMileLyft);
            var uberPrice = InitialChargeUber + ServiceFeeUber + (distance * costPerMileUber);

            if (uberPrice < MinimumFareUber) {
                $("#uberPrice").html("<p class='results'> <b>Uber:</b> $" + MinimumFareUber);
                // $("#uberPrice").html("<a class='waves-effect waves-light btn-small'>Uber: "+MinimumFareUber+"</a>");
            } else {
                $("#uberPrice").html("<p class='results'> <b>Uber:</b> $" + uberPrice.toFixed(2));
                // $("#uberPrice").html("<a class='waves-effect waves-light btn-small'>Uber: "+ uberPrice.toFixed(2)+"</a>");
            }

            if (lyftPrice < MinimumFareUber) {
                $("#lyftPrice").html("<div class = 'results'> <b>Lyft:</b> $" + MinimumFareLyft);
            } else {
                $("#lyftPrice").html("<div class = 'results'> <b>Lyft:</b> $" + lyftPrice.toFixed(2));
            }

            $("#origin-address").html("<div class='results'><b> Starting at:</b><br> " + originAddress)
            $("#destination-address").html("<div class='results'> <b>Arriving at:</b><br>" + destinationAddress + "<hr>")
            $("#display-distance").append("<div class='results'> <b>Distance:</b><br> " + distance + " miles")
            $("#display-duration").append("<div class='results'> <b>Duration:</b><br> " + tripTime + " minutes<hr>")

        }); // end ajax call
        addToDatabase()
    });


    // drop down of recent searches section


    $(".input-origin").focus(function () {
        $(".addressList").css('display', 'block');
    });

    $(".input-destination").focus(function () {
        $(".addressListTwo").css('display', 'block');
    });

    $('.container').children().not('.input-wrapper').click(function () {
        // Hide the item list on body click.
        $(".addressList").css('display', 'none');
        $(".addressListTwo").css('display', 'none');
    });


    // Firebase section

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyD9NQ5HD9-axStBjspiOfxstvdn-VJc9aI",
        authDomain: "irydefix.firebaseapp.com",
        databaseURL: "https://irydefix.firebaseio.com",
        projectId: "irydefix",
        storageBucket: "irydefix.appspot.com",
        messagingSenderId: "1020034828009"
      };
      firebase.initializeApp(config);

    var database = firebase.database();

    // sends user input after button click to database
    $('#getPrices').on('click',function(){
        database.ref().push({
            pickupLocation: originAddress,
            destination: destinationAddress,

        });
    });

    // Firebase watcher .on("child_added"
    database.ref().on("child_added", function (childSnapshot) {
        // storing the snapshot.val() in a variable for convenience
        var sv = childSnapshot.val();

        // Console.loging the data
        console.log(sv.pickupLocation);
        console.log(sv.destination);

        // Change the HTML to reflect
       
        $(".addressList").append('<div class="oo">' + sv.pickupLocation + '</div>' );
        $('#pp div:lt(-4)').remove();
        $(".addressListTwo").append('<div class="inp">'+sv.destination+'</div>');
        $('#dd div:lt(-4)').remove();
        
        // Handle the errors
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
    
    $("div#pp").on("click", "div", function(){
        var inputValue = $('.input-origin');
        var data = $(this).text();
        inputValue.val(data);
        console.log(data)
    });

    $("div#dd").on("click", "div", function(){
        var inputValue = $('.input-destination');
        var data = $(this).text();
        inputValue.val(data);
        console.log(data)
    });
    

});//doc ready closing tag

