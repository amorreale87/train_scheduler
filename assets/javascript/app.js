    $(document).ready(function(){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAo2kvzr0B6JI8LAKPRgKoDFkt_qV1SL00",
    authDomain: "practice-5657e.firebaseapp.com",
    databaseURL: "https://practice-5657e.firebaseio.com",
    projectId: "practice-5657e",
    storageBucket: "practice-5657e.appspot.com",
    messagingSenderId: "225545782434"
  };
  firebase.initializeApp(config);

  var rtvName;
     var rtvRole;
     var rtvStartDate;
     var rtvMonthlyRate;

console.log("App Initialized");
    // Create a variable to reference the database
  var database = firebase.database();
  var name="Initial name";
  var role="Initial role";
  var startDate="startDate";
  var montlyRate="Initial Comment";

    $("#add-schedule").on("click", function(event) {
      event.preventDefault();

      // Grabbed values from text boxes
      trainName= $("#add-train").val().trim();
      destination = $("#add-destination").val().trim();
      frequency = $("#frequency").val().trim();
      arrival = $("#arrival").val().trim();


      var start=moment(arrival, "HH:mm");
      var nowTime=moment();
 
      var tripLength=frequency;
      var trips=nowTime.diff(start, 'minutes');
      var tripsCompleted=trips/tripLength;
      var remainder=trips % tripLength;
      var minutesAway=tripLength-remainder;


      var nextArrival = nowTime.add(minutesAway,'minutes').format("hh:mm a")
      


      console.log(trainName)
      console.log(destination)
      console.log(frequency)
      console.log(arrival)
      console.log(minutesAway)
      console.log(nextArrival)



      // Code for handling the push
      database.ref().push({
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        nextArrival: nextArrival,
        arrival: arrival,
        minutesAway: minutesAway

      });

    });

  database.ref().on("child_added", function(childSnapshot) {

      // Log everything that's coming out of snapshot
     rtvTrainName=(childSnapshot.val().trainName);
     rtvDestination=(childSnapshot.val().destination);
     rtvFrequency=(childSnapshot.val().frequency);
     rtvNextArrival=(childSnapshot.val().nextArrival);
     rtvMinutesAway = (childSnapshot.val().minutesAway);

      console.log(childSnapshot.val().trainName);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().frequency);
      console.log(childSnapshot.val().arrival);

      console.log(rtvTrainName);
      console.log(rtvDestination);
      console.log(rtvFrequency);
      console.log(rtvNextArrival);
      
    // var monthsWorked=moment(rtvStartDate).toNow();
    // console.log(monthsWorked);
    // var a=moment(rtvStartDate);
    // var b=moment();
    // var c=b.diff(a,'months');
    // var paidOut=rtvMonthlyRate*c;
    // // var d=moment().diff(moment(rtvStartDate), 'months', true)
    // console.log("Date Diff in months: "+ c);

    

    // var retrievedEEdata="<td>"+rtvName+"</td>";
    // retrievedEEdata+="<td>"+rtvRole+"</td>";
    // retrievedEEdata+="<td>"+rtvStartDate+"</td>";
    // retrievedEEdata+="<td>48</td>";
    // retrievedEEdata+="<td>"+ rtvMonthlyRate +"</td>";
    // retrievedEEdata+="<td>48000</td>";
    $("#emplData").append("<tr class='eeDataRow'>" +
      "<td>"+rtvTrainName+"</td>" +
      "<td>"+rtvDestination+"</td>" +
      "<td>"+rtvFrequency+"</td>" + 
      "<td>"+ rtvNextArrival +"</td>" +
      "<td>" + rtvMinutesAway + "</td>" +  
      "</tr>"


      );



    // $("#eeDataRow").append("<td class='eeData'>"+retrievedEEdata+"</td>");
        });

   });