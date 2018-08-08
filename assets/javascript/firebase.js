// //firebase database javascript

// added to main javascript file for ease of use


// $(document).ready(function () {
//   var config = {
//       apiKey: "AIzaSyCzXDZCVvFgD8RIqO0UkBxQLDc4Vxum4f0",
//       authDomain: "iryde-62588.firebaseapp.com",
//       databaseURL: "https://iryde-62588.firebaseio.com",
//       projectId: "iryde-62588",
//       storageBucket: "iryde-62588.appspot.com",
//       messagingSenderId: "563500222257"
//   };
//   firebase.initializeApp(config);

//   var database = firebase.database();
//   var puLocation = $("#pickuplocation")
//   var doLocation = $("#destination")
//   // sends user input after button click to database
//   database.ref("rideHistory").push({
//       pickupLocation: pickUpLocation,
//       destination: destination,
//       distance: distance,
//       time: tripTime,
//       startLocation: startLocation,
//       dateAdded: firebase.database.ServerValue.TIMESTAMP
//   });

// });//documentready closing