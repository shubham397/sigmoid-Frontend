import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Dashboard from "./Dashboard";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../actions";

export default function Home() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [rememberMe, setRememberMe] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const signInData = useSelector((state) => state.currentUser);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(signInData, "signInData");
  }, [signInData]);

  const handleSubmit = () => {
    const cookies = new Cookies();
    setShowLoader(true);
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      email: email,
      password: password,
      rememberMe: rememberMe,
    });

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://sigviewauth.sigmoid.io/signIn", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.statusCode === "200") {
          dispatch(allActions.userActions.setUser(result.token));
          cookies.set("token", result.token, {
            maxAge: 60 * 60 * 24,
            path: "/",
          });
        } else {
          setError(true);
          setErrorMessage(result.statusMessage);
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setShowLoader(false);
      });
  };

  if (signInData) {
    return (
      <>
        <div className="Auth-form-container">
          <Dashboard />
        </div>
      </>
    );
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="form-group mt-3 credit">
            <label className="switch">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => {
                  setRememberMe(e.target.checked);
                }}
              />
              <span className="slider round"></span>
            </label>
            <label className="creditLabel">Remember Me</label>
          </div>
          {error && <h6 className="errorMessage">{errorMessage}</h6>}
          <div className="d-grid gap-2 mt-3">
            {showLoader ? (
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only"></span>
              </div>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
