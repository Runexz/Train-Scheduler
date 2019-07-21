

console.log("hello world");


// Your web app's Firebase configuration
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


var trainStatCount = 0;

// when the submit button is clicked this function will run
$("#addInfo").on("click", function (event) {
    event.preventDefault();

    // get the train name from input and store it into a variable
    var trainNameEntry = $("#addTrainName").val().trim();


})