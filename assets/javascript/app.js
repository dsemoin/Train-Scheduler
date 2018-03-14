


  // Initialize Firebase/this entire code is from firebase
  var config = {
    apiKey: "AIzaSyCLw7JlVwgY5IpqYtC3Qi3s640z2C87BKM",
    authDomain: "train-scheduler-7bb3b.firebaseapp.com",
    databaseURL: "https://train-scheduler-7bb3b.firebaseio.com",
    projectId: "train-scheduler-7bb3b",
    storageBucket: "train-scheduler-7bb3b.appspot.com",
    messagingSenderId: "482975100962"
  };
  firebase.initializeApp(config);
  console.log(firebase);

  var database = firebase.database();

database.ref().on("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
    //  momentjs starts here to get times
        // Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(childSnapshot.val().newArrival, "hh:mm"), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % childSnapshot.val().frequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = childSnapshot.val().frequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

        // Add a table row to view data from firebase
        $("tbody").append('<tr><td>' + childSnapshot.val().name + 
        '</td><td>' + childSnapshot.val().where + '</td><td>' + childSnapshot.val().frequency + 
        '</td><td>' + nextTrain.format("hh:mm a") + '</td><td>' + tMinutesTillTrain +
        '</td></tr>' );
        console.log(childSnapshot.val());
    }) 
if (snapshot.child("time").exists()) {
    
$("#time").text(snapshot.val().firstTrainTime);

}

});

// Whenever a user clicks the submit-form button
$("#submit-form").on("click", function(event) {
    
    // Prevent form submitting
    event.preventDefault();
    // write variables
    var trainName = $("#inputName").val().trim();
    var destination =$("#destination").val().trim();
    var frequency = $("#frequency").val().trim();
    var firstTrainTime =$("#time").val().trim();
    
    var ref = database.ref();
    // this information will show up on firebase
    var data = {
        name: trainName,
        where: destination,
        frequency: frequency,
        newArrival:firstTrainTime
        
    }
// this pushes data to firebase
  ref.push(data);
    console.log(firstTrainTime);
});


