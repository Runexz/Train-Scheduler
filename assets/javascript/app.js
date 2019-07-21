

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
    var trainTimeEntry = parseInt($("#addTrainTime").val().trim());
    var trainFrequencyEntry = parseInt($("#addFrequency").val().trim());

    // save the new input entries in Firebase.  
    database.ref().set({
        trainName: trainNameEntry,
        trainDestination: trainDestinationEntry,
        trainTime: trainTimeEntry,
        trainFrequency: trainFrequencyEntry
    });
    console.log("Train name " + data.trainName)

});

// at initial load and subsequent value chages, get a snapshot of the stored data
// function to update page in real-time when the firebase database changes
database.ref().on("value", function(snapshot) {

    // if any error are experiencced log them to console
    //  function(errorObject) {
    //     console.log("the read failed: " + errorObject.code)
    // }

});