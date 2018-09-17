// Initialize Firebase
var config = {
  apiKey: "AIzaSyDehVTK8bKydeja68w3D1UaMgoMtJJ73Ck",
  authDomain: "test-5e833.firebaseapp.com",
  databaseURL: "https://test-5e833.firebaseio.com",
  projectId: "test-5e833",
  storageBucket: "test-5e833.appspot.com",
  messagingSenderId: "635088554189"
};
firebase.initializeApp(config);

var database = firebase.database();

console.log(database);

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#train-name-input")
    .val()
    .trim();
  var destination = $("#destination-input")
    .val()
    .trim();
  var firstTime = moment(
    $("#firstTrainTime-input")
      .val()
      .trim(),
    "HH:mm"
  ).format("X");
  var frequency = $("#frequency-input")
    .val()
    .trim();

  var newTrain = {
    name: trainName,
    destination: destination,
    firstTrainTime: firstTime,
    frequency: frequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrainTime);
  console.log(newTrain.frequency);

  alert("successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#firstTrainTime-input").val("");
  $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTrainTime = childSnapshot.val().firstTrainTime;
  var frequency = parseInt(childSnapshot.val().frequency);

  console.log(trainName);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(frequency);

  var firstTrainTimePretty = moment.unix(firstTrainTime).format("HH:mm a");
  console.log(firstTrainTimePretty);

  var firstTimeConverted = moment(firstTrainTimePretty, "hh:mm a").subtract(
    1,
    "months"
  );
  console.log(moment(firstTrainTimePretty, "hh:mm a"));
  console.log(firstTimeConverted);
  var currentTime = moment();
  console.log(currentTime);
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm a"));
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);
  var tRemainder = diffTime % frequency;
  console.log(tRemainder);
  var tMinutesTillTrain = frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm a"));
  var arrivalTime = moment(nextTrain).format("hh:mm a");

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(arrivalTime),
    $("<td>").text(tMinutesTillTrain)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});
