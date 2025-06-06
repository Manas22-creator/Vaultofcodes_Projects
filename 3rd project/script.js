 function validateForm() {
      const pwd = document.getElementById("password").value;
      const cpwd = document.getElementById("confirmPassword").value;
      if (pwd !== cpwd) {
        alert("Passwords do not match!");
        return false;
      }
      alert("Registration Successful!");
      return true;
    }