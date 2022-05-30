import React, { useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import { loginUser } from "./../redux/actions/authActionCreators";

const LoginForm = ({ dispatchLoginAction }) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ user: false, password: false });

  const handleOnSubmit = (event) => {
  
    event.preventDefault();
    if (isFormInvalid()) updateErrorFlags();
    else
      dispatchLoginAction(
        user,
        password,
        () => toast.success("Ingreso a QUIZ!"),
        (message) => toast.error(`Error: ${message}`)
      );
  };

  const isFormInvalid = () => !user || !password;

  const updateErrorFlags = () => {
    const errObj = { user: false, password: false };
    if (!user.trim()) errObj.user = true;
    if (!password.trim()) errObj.password = true;
    setError(errObj);
  };

  return (
    <React.Fragment>
      <form noValidate onSubmit={handleOnSubmit}>
        <div className="row mb-3">
          <label htmlFor="user" className="col-sm-2 col-form-label">
            Usuario
          </label>
          <div className="col-sm-10">
            <input
              noValidate
              id="user"
              type="text"
              name="user"
              placeholder="user"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className={`form-control ${error.user ? "is-invalid" : ""}`}
            />
            <p className="invalid-feedback">Required</p>
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="email" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              noValidate
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`form-control ${error.password ? "is-invalid" : ""}`}
            />
            <p className="invalid-feedback">Required</p>
          </div>
        </div>

        

        <div className="row mb-4">
          <button type="submit" className="btn btn-primary btn-block mb-4">
            Ingresar
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatchLoginAction: (user, password, onSuccess, onError) =>
    dispatch(loginUser({ user, password }, onSuccess, onError)),
});
export default connect(null, mapDispatchToProps)(LoginForm);
