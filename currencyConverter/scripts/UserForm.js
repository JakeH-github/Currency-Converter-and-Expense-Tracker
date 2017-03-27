$("#btnUserClear").click(function () {
  clearUserForm();
});

$("#frmUserForm").submit(function () { //Event : submitting the form
  saveUserForm();
  return true;
});

function checkUserForm() { 
  if (($("#txtFirstName").val() != "") &&
    ($("#txtLastName").val() != ""))
  {return true;}
   else {
    return false;
  }
}

function saveUserForm() {
  if (checkUserForm()) {
    var user = {
      "FirstName": $("#txtFirstName").val(),
      "LastName": $("#txtLastName").val(),
      "NewPassword": $("#changePassword").val(),
    };

    try {
      localStorage.setItem("user", JSON.stringify(
        user));
      alert("Saving Information");

      $.mobile.changePage("#pageMenu");
      window.location.reload();
    } catch (e) {
      /* Google browsers use different error 
       * constant
       */
      if (window.navigator.vendor ===
        "Google Inc.") {
        if (e == DOMException.QUOTA_EXCEEDED_ERR) {
          alert(
            "Error: Local Storage limit exceeds."
          );
        }
      } else if (e == QUOTA_EXCEEDED_ERR) {
        alert("Error: Saving to local storage.");
      }

      console.log(e);
    }
  } else {
    alert("Please complete the form properly.");
  }

}

function clearUserForm() {
  localStorage.removeItem("user");
  alert("The stored data have been removed");
}

function showUserForm() { //Load the stored values in the form
  try {
    var user = JSON.parse(localStorage.getItem(
      "user"));
  } catch (e) {
    /* Google browsers use different error 
     * constant
     */
    if (window.navigator.vendor ===
      "Google Inc.") {
      if (e == DOMException.QUOTA_EXCEEDED_ERR) {
        alert(
          "Error: Local Storage limit exceeds."
        );
      }
    } else if (e == QUOTA_EXCEEDED_ERR) {
      alert("Error: Saving to local storage.");
    }

    console.log(e);
  }

  if (user != null) {
    $("#txtFirstName").val(user.FirstName);
    $("#txtLastName").val(user.LastName);
    $("#changePassword").val(user.NewPassword);
  }
}

function userInfo(){
    if(localStorage.getItem("user")===null){
        alert("No User information found.\nFill out the above fields to create an account. ");
    }
    else{
        var user = JSON.parse(localStorage.getItem("user"));
        alert("User: " + user.FirstName + " " + user.LastName + "\nPassword: " + user.NewPassword) ;
    }
}
function appInfo(){
    alert("Expense Tracker Developed by:\n\n" + 
         "Olumide Adenmosun - Bug-tester \nLuke Bramos - Bug-tester \nDavid Goldstein - Assistant Developer, Bug-tester\n" +
         "Jake Horvath - Lead Developer, Software Architect\nAshley Roark - Software Architect");
}
