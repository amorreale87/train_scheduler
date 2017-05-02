    $(document).ready(function(){
    var config = {
    apiKey: "AIzaSyDqpGiL9b7bOJknO3SKGy90zRQVt07RAbU",
    authDomain: "firstproject-ae275.firebaseapp.com",
    databaseURL: "https://firstproject-ae275.firebaseio.com",
    projectId: "firstproject-ae275",
    storageBucket: "firstproject-ae275.appspot.com",
    messagingSenderId: "1001301977102"
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

    $("#add-employee").on("click", function(event) {
      event.preventDefault();

      // Grabbed values from text boxes
      name = $("#name-input").val().trim();
      role = $("#role-input").val().trim();
      startDate = $("#startdate-input").val().trim();
      monthlyRate = $("#monthlyrate-input").val().trim();

      // Code for handling the push
      database.ref().push({
        name: name,
        role: role,
        startDate: startDate,
        monthlyRate: monthlyRate
      });

    });

  database.ref().on("child_added", function(childSnapshot) {

      // Log everything that's coming out of snapshot
     rtvName=(childSnapshot.val().name);
     rtvRole=(childSnapshot.val().role);
     rtvStartDate=(childSnapshot.val().startDate);
     rtvMonthlyRate=(childSnapshot.val().monthlyRate);

      console.log(childSnapshot.val().name);
      console.log(childSnapshot.val().role);
      console.log(childSnapshot.val().startDate);
      console.log(childSnapshot.val().monthlyRate);

      console.log(rtvName);
      console.log(rtvRole);
      console.log(rtvStartDate);
      console.log(rtvMonthlyRate);
      
    var monthsWorked=moment(rtvStartDate).toNow();
    console.log(monthsWorked);
    var a=moment(rtvStartDate);
    var b=moment();
    var c=b.diff(a,'months');
    var paidOut=rtvMonthlyRate*c;
    // var d=moment().diff(moment(rtvStartDate), 'months', true)
    console.log("Date Diff in months: "+ c);

    

    // var retrievedEEdata="<td>"+rtvName+"</td>";
    // retrievedEEdata+="<td>"+rtvRole+"</td>";
    // retrievedEEdata+="<td>"+rtvStartDate+"</td>";
    // retrievedEEdata+="<td>48</td>";
    // retrievedEEdata+="<td>"+ rtvMonthlyRate +"</td>";
    // retrievedEEdata+="<td>48000</td>";
    $("#emplData").append("<tr class='eeDataRow'>" +
      "<td>"+rtvName+"</td>" +
      "<td>"+rtvRole+"</td>" +
      "<td>"+rtvStartDate+"</td>" +
      "<td>"+c+"  </td>" + 
      "<td>"+ rtvMonthlyRate +"</td>" + 
      "<td>"+paidOut+"</td>" +
      "</tr>"


      );



    // $("#eeDataRow").append("<td class='eeData'>"+retrievedEEdata+"</td>");
        });

   });