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
            distance = (result.resourceSets[0].resources[0].results[0].travelDistance).toFixed(2)
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

    $(".addressList div").click(function () {
        var inputValue = $('.input-origin');
        var data = $(this).text();
        inputValue.val(data);
    });

    $(".input-destination").focus(function () {
        $(".addressListTwo").css('display', 'block');
    });

    $(".addressListTwo div").click(function () {
        var inputValue = $('.input-destination');
        var data = $(this).text();
        inputValue.val(data);
    });

    $('.container').children().not('.input-wrapper').click(function () {
        // Hide the item list on body click.
        $(".addressList").css('display', 'none');
        $(".addressListTwo").css('display', 'none');
    });


    // Firebase section

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCzXDZCVvFgD8RIqO0UkBxQLDc4Vxum4f0",
        authDomain: "iryde-62588.firebaseapp.com",
        databaseURL: "https://iryde-62588.firebaseio.com",
        projectId: "iryde-62588",
        storageBucket: "iryde-62588.appspot.com",
        messagingSenderId: "563500222257"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    // sends user input after button click to database
    function addToDatabase() {
        database.ref("rideHistory").push({
            pickupLocation: originAddress,
            destination: destinationAddress,
            distanceMiles: distance,
            time: tripTime,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
    }

    // Firebase watcher .on("child_added"
    database.ref("rideHistory").on("child_added", function (snapshot) {
        // storing the snapshot.val() in a variable for convenience
        var sv = snapshot.val();

        // Console.loging the data
        console.log(sv.pickupLocation);
        console.log(sv.destination);
        console.log(sv.distanceMiles);
        console.log(sv.time);

        // Change the HTML to reflect
        $(".addressList").append('<div class="recentRides">' + sv.pickupLocation + '');

        // Handle the errors
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });


});//doc ready closing tag

