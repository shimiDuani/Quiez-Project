import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import "./loginPage.scss";

function LoginPage() {
  // React States
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [users, SetUsers] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3030/admin")
      .then((response) => response.json())
      .then((data) => SetUsers(data));
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
    debugger;
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
    debugger;
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
          <label>Username</label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );
  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? (
          <div>
            <p className="onSuccess">
              User: {user.name} is successfully logged in
            </p>
            <button onClick={() => goToPage()}>Go to page</button>
          </div>
        ) : (
          renderForm
        )}
      </div>
    </div>
  );
}

export default LoginPage;
