import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {ErrorMessage, Formik, Form, Field} from "formik";
import Superheroe from "./images/superheroes.png"

const Login = ({ setToken }) => {
  const [loginError, setLoginError] = useState("");
  return (
    <div>
    <Formik
      initialValues={{
        email: "",
        password: ""
      }}
      onSubmit={async (values)=> {
        fetch("http://challenge-react.alkemy.org/", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(values)
      }).then(response => response.json())
  .then(response => setToken(response))     
  .catch(error => setLoginError("Invalid credentials"))
      }}
      validate={(values)=> {
        let errors = {};
        if(!values.email) {
          errors.email = "Por favor, ingresa un email";
          } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)) {
            errors.email = "Por favor, ingresa un email válido";
          }
        if(!values.password) {
          errors.password = "Por favor, ingresa una contraseña";
        }
        return errors;
      }}
    >
      {( {errors, isSubmitting} ) => (
    <Form>
      <div className="container mt-3">
        <div className="form">
           <h3 className="my-4 font-weight-bold .display-4">Bienvenido. Por favor, inicia sesión</h3>
             <div className="label">
                <label htmlFor="email">Email</label>
             </div>
              <div className="form-item">
                <Field 
                type="email"
                name="email"
                className="input"
                />
              </div>
              <div className="error">
                <ErrorMessage name="email" component={()=> (<div className="error-text">{errors.email}</div>)}/>
              </div>
              <div className="label">
                <label htmlFor="password">Contraseña</label>
              </div>
              <div className="form-item">
                <Field 
                type="password"
                name="password"
                className="input"
                />
              </div>
              <div className="error">
                <ErrorMessage name="password" component={()=> (<div className="error-text">{errors.password}</div>)}/>
              </div>
              <div className="submit-button">
                <button type="submit" className="btn btn-dark mt-3" disabled={isSubmitting}>
                Enviar
                </button>
              </div>
              <div className="login-error">
                {loginError && <div className="error">{loginError}</div>}
              </div>
        </div>
        <div className="login-img">
          <img src={Superheroe} alt="logo"/>
        </div>
      </div>
              
    </Form>
    )}
    </Formik>
    </div>
    
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default Login;