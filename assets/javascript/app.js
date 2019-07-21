

console.log("hello world");


// my web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBeaeeRZRhQxOMbKmwcBok28_H9Meolyp8",
    authDomain: "train-scheduler-87b65.firebaseapp.com",
    databaseURL: "https://train-scheduler-87b65.firebaseio.com",
    projectId: "train-scheduler-87b65",
    storageBucket: "",
    messagingSenderId: "166712060124",
    appId: "1:166712060124:web:29f7b7b8cf344b49"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// create a variable to reference the database
var database = firebase.database();


var trainStatCount = 0;

// when the submit button is clicked this function will run
$("#addInfo").on("click", function (event) {
    event.preventDefault();

    // get the train info from input and store it into a variable
    var trainNameEntry = $("#addTrainName").val().trim();
    var trainDestinationEntry = $("#addDestination").val().trim();
    var trainTimeEntry = $("#addTrainTime").val().trim();
    var trainFrequencyEntry = $("#addFrequency").val().trim();

    // save the new input in a variable and push entries in Firebase.  
    var trainContent = {
        trainName: trainNameEntry,
        trainDestination: trainDestinationEntry,
        trainTime: trainTimeEntry,
        trainFrequency: trainFrequencyEntry
    }
    database.ref().push(trainContent);
    console.log("Train name " + trainContent.trainName);

    // resets the input boxes to blank
    $("#addTrainName").val("");
    $("#addDestination").val("");
    $("#addTrainTime").val("");
    $("#addFrequency").val("");


});

// at initial load and subsequent value chages, get a snapshot of the stored data
// function to update page in real-time when the firebase database changes
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    //store the value of firebase database child 
    var trainNameEntry = childSnapshot.val().trainName;
    var trainDestinationEntry = childSnapshot.val().trainDestination;
    var trainTimeEntry = childSnapshot.val().trainTime;
    var trainFrequencyEntry = childSnapshot.val().trainFrequency;

    //use moment.js for time conversion
    // unable to use moment will wait for TA assistance

    // first time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(trainTimeEntry, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // current time
    var currentTime = moment();
    console.log("The time now is: " + moment(currentTime).format("hh:mm a"));

    // difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("Difference in Time: " + diffTime);

    // time apart (the remainder)
    var tRemainder = diffTime % trainFrequencyEntry;
    console.log("Remainder: " + tRemainder);

    //minutes until train arrives
    var minutesTill = trainFrequencyEntry - tRemainder;
    console.log("Minutes until train arrives: " + minutesTill);

    // next train arrival
    var nextTrain = moment().add(minutesTill, "minutes").format("hh:mm a");
    console.log("Arrival time: " + nextTrain);



    //put train information into html id updateInfo
    $("#updateInfo").append("<tr><td>" + trainNameEntry + "</td><td>" + trainDestinationEntry + "</td><td>" + trainFrequencyEntry + "</td><td>" + nextTrain + "</td><td>" + minutesTill + "</td></tr>");
    // $("<tr>").append("<th>");
    // $("<th>").attr("scope", "row");
    // $("<th>").text(trainNameEntry);
    // $("<th>").append("<td>" + trainDestinationEntry + "</td><td>" + trainFrequencyEntry + "</td>")


    // if any error are experiencced log them to console
}, function (errorObject) {
    console.log("the read failed: " + errorObject.code)

});