import React, { useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import { registerUser } from "./../redux/actions/authActionCreators";

const RegisterForm = ({ dispatchRegisterAction }) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ user: false, password: false });

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (isFormInvalid()) updateErrorFlags();
    else
      dispatchRegisterAction(
        user,
        password,
        () => toast.success("Cuenta registrada correctamente!"),
        (message) => toast.error(`Error: ${message}`)
      );
  };

  const handleCancelForm = (event) => {
    event.preventDefault();
    setUser("");
    setPassword("");
    setError({ user: false, password: false });
  };

  const isFormInvalid = () => !user || !password;

  const updateErrorFlags = () => {
    const errObj = { user: false, password: false };
    if (!user) errObj.user = true;
    if (!password) errObj.password = true;
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

        <div className="row mb-3">
          <div className="col-6">
            <button type="submit" className="btn btn-primary btn-block mr-2 w-100">
              Registrar
            </button>
          </div>

          <div className="col-6">
            <button
              onClick={handleCancelForm}
              className="btn btn-outline-secondary btn-block w-100"
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatchRegisterAction: (user, password, onSuccess, onError) =>
    dispatch(registerUser({ user, password }, onSuccess, onError)),
});
export default connect(null, mapDispatchToProps)(RegisterForm);
