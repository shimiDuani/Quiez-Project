import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import ServiceAdmin from "../../service/serviceAdmin";
import "./loginPage.scss";

function LoginPage() {
  // React States
  const navigate = useNavigate();
  const service = new ServiceAdmin();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [users, SetUsers] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    service.get().then((data) => {
      console.log("admins", data);
      SetUsers(data);
    });
    console.log(users);
    setIsLoading(false);
  }, []);
  if (isLoading) {
    return <h3>is Loading....</h3>;
  }

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };

  const handleSubmit = (event) => {
    //Prevent page reload

    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = users.find((user) => user.name === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setUser(userData);
        setIsSubmitted(true);
        //navigate("/chooseAccount/"+userData.id);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };
  const goToPage = () => {
    navigate("/chooseAccount/" + user.id);
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className=" login">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username : </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password : </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <button type="submit" class="btn btn-success">
            Login
          </button>
        </div>
      </form>
    </div>
  );
  return (
    <div className="app">
      <div className="login-form">
        <p className="title">Log In</p>
        {isSubmitted ? (
          <div>
            <p className="onSuccess">
              User: {user.name} is successfully logged in
            </p>
            <button class="btn btn-primary" onClick={() => goToPage()}>
              Go to page
            </button>
          </div>
        ) : (
          renderForm
        )}
      </div>
    </div>
  );
}

export default LoginPage;
