import React from "react";
import LoginForm from "../components/login.component";
import { Link } from "react-router-dom";

const AuthPage = () => (
  <>
    <div className="container">
      <div className="row justify-content-evenly">
        <div className="col-md-6">
         
            <div className="text-center mb-3 ">
              <h1>Acceso QUIZ</h1>
            </div>

            <LoginForm></LoginForm>

            <div className="text-center">
              <p>
                No estas registrado?{" "}
                <Link className="navbar-brand" to="/new">
                  click aquí
                </Link>
              </p>
            </div>
        
        </div>
      </div>
    </div>

  </>
);

export default AuthPage;
