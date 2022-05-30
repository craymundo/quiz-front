import React from "react";
import RegisterForm from "../components/register.component";
import { Link } from "react-router-dom";
const RegisterPage = () => (
  <>
    <div className="container">
      <div className="row justify-content-evenly">
        <div className="col-md-6">
          <div className="text-center mb-3 ">
            <h3>Crear nuevo usuario-QUIZ</h3>
          </div>

          <RegisterForm />

          <div className="text-center">
            <p>
              Ya estas registrado&nbsp;
              <Link className="navbar-brand" to="/login">
                click aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default RegisterPage;
