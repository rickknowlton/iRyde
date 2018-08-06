// variable for Uber and Lyft cost 

//uber object
var Uber = {
    flatFee: 1.20,
    pricePerMile:1.50,
    bookingFee:2.05,
    minFare:7.26
}
//lyft object
var lyft = {
    flatFee: 1.20,
    pricePerMile:1.35,
    bookingFee:2.45,
    minFare:6.45
}

// calculates Uber Fare 
// var UberCost = function // Need code for this

 var InitialChargeUber = 1.20;
 var costPerMileUber = 1.50;
 var BookingFeeUber = 2.05;
 var MinimumFareUber = 7.26;

 // Need to figure out how to take the mileage that we get from the API and multiply that by the cost per mile

 var UberCost = InitialChargeUber + BookingFeeUber; // needs to include miliage costs
 
// Need code for minimum fee so that if the cost is below the min fee the min price is pushed

// calculates Lyft Fare 
// var LyftCost = function // Need code for this

 var InitialChargeLyft = 1.20;
 var costPerMileLyft = 1.35;
 var ServiceFeeLyft = 2.45;
 var MinimumFareLyft = 6.45;

 // Need to figure out how to take the mileage that we get from the API and multiply that by the cost per mile

 var UberCost = InitialChargeLyft + ServiceFeeLyft; // needs to include mileage costs
 
// Need code for minimum fee so that if the cost is below the min fee the min price is pushed




/*  Pricing Matrix for Uber and Lyft

Uber:

Initial charge    $1.20
Metered fare    $1.50 (per mile) 
Booking fee    $2.05

Minimum Fare: $7.26

Lyft:

Initial charge    $1.20
Metered fare    $1.35 (per mile) 
Service Fee    $2.45

Minimum Fare: $6.45

*/