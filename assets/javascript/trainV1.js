//this first bit of code is what's pulled from firebase.  It includes an apiKey, the domain name and where the files are stored, the url address, where the files are stored and a SenderId, which I assume is like a token.
//the firebase.intializeApp(config); file starts the engine.\
// alert("yo!");
var config = {
    apiKey: "AIzaSyAU4ux0jGk3EOPZSJqfDNLM78cTzcldsY0",
    authDomain: "train-transit-93062.firebaseapp.com",
    databaseURL: "https://train-transit-93062.firebaseio.com",
    projectId: "train-transit-93062",
    storageBucket: "train-transit-93062.appspot.com",
    messagingSenderId: "49969572645"
};
firebase.initializeApp(config);
//So I don't have to type firebase.database(),


//the variable trainData has been created to act as it's representative.
var trainData = firebase.database()


//3rd step in the logic is to create a click button that is going to connected to the button code in the html.  In this case it is the ID of #submitButton.
//When the button is clicked, it is going to call and retrieve the input values from the users input.  This is done with .val()
//Variables  for the 4 input fields are created so that when these functions are called up at a later time, I can use and refer to the variable as short hand and not have to type out the entire function.


$("#submitBtn").on("click", function() {

    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var frequency = $("#frequencyInput").val().trim();

    //tried to create an object here for what I wanted to be uploaded to firebase.
    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
    }

    trainData.ref().push(newTrain);

    // alert("Button works!");


    //grabbing the data from the id's in the train
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("firstTrainInput").val("");
    $("frequencyInput").val("");
    console.log(firstTrain);
    return false;

});

trainData.ref().on("child_added", function(snapshot) {
        var name = snapshot.val().name;
        var destination = snapshot.val().destination;
        var frequency = snapshot.val().frequency;
        var firstTrain = snapshot.val().firstTrain;

        var remainder = moment().dif(moment.unix(firstTrain), "minutes") % frequency;
        var minutes = frequency - remainder;
        var arrival = moments().add(minutes, "m").format("hh:mm A");

        console.log(remainder);
        console.log(minutes);
        console.log(arrival);

        $("#trainTable > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrival + "</td><td>" + minutes + "</td></tr>");

    }

);
