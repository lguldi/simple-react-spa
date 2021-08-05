import React, { useContext, useEffect, useRef, useState } from "react";
import { Form, Field } from "react-final-form";
import { tokenExists } from "../utilities/authentication";
import UserContext from "../context/UserContext";

const required = (value) => (value ? undefined : "Required");

const LogInForm = (props) => {
  const userContext = useContext(UserContext);
  const usernameInput = useRef(null);
  const [serverErrors, setServerErrors] = useState({
    errors: false,
    errorMsg: ""
  });

  const isValidatingToken =
    tokenExists() && !userContext.user.isLoggedIn ? true : false;

  useEffect(() => {
    if (usernameInput && usernameInput.current) usernameInput.current.focus();
  }, []);

  const onSubmit = async (values) => {
    setServerErrors({
      errors: false,
      errorMsg: ""
    });
    userContext.handleLogin(values.name, values.password);
  };

  return (
    <>
      {isValidatingToken ? (
        <div className="inprogress">
          <div className="header">Please wait</div>
          <p>Verifying authentication token...</p>
        </div>
      ) : (
        <>
          {userContext.userError && userContext.userError.error && (
            <div className="error-message">
              <div className="header">Error</div>
              <p>
                {userContext.userError.title}: {userContext.userError.message}
              </p>
            </div>
          )}
          <p>
            To interact with this demo Login form, please open a console and
            start the mock server by running
          </p>
          <code>yarn mockserver</code>
          <p>
            <b>Login using the following: </b>
            <br />
            <b>ID:</b> <code>demo</code>
            <br />
            <b>Password:</b> <code>password</code>
          </p>
          {serverErrors.errors && (
            <div className="error-message">
              <div className="header">There was a problem</div>
              <p>{serverErrors.errorMsg}</p>
            </div>
          )}
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form
                onSubmit={handleSubmit}
                className="login-form"
                data-testid="loginform"
              >
                <Field name="name" validate={required}>
                  {({ input, meta }) => (
                    <div
                      className={
                        meta.error && meta.touched ? "error field" : "field"
                      }
                    >
                      <label htmlFor="name">Username</label>
                      <input
                        {...input}
                        className={`${
                          meta.error && meta.touched ? "required" : ""
                        }`}
                        id="name"
                        type="text"
                        placeholder="Name"
                        ref={usernameInput}
                      />
                      {meta.error && meta.touched && (
                        <span className="required">{meta.error}</span>
                      )}
                    </div>
                  )}
                </Field>
                <Field name="password" validate={required}>
                  {({ input, meta }) => (
                    <div
                      className={
                        meta.error && meta.touched ? "error field" : "field"
                      }
                    >
                      <label htmlFor="password">Password</label>
                      <input
                        {...input}
                        className={`${
                          meta.error && meta.touched ? "required" : ""
                        }`}
                        id="password"
                        type="password"
                        placeholder="Password"
                      />
                      {meta.error && meta.touched && (
                        <span className="required">{meta.error}</span>
                      )}
                    </div>
                  )}
                </Field>

                <div className="buttons">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="ui button primary"
                  >
                    Submit
                  </button>{" "}
                  <button
                    className="ui button"
                    type="button"
                    onClick={() => {
                      form.reset();
                      usernameInput.current.focus();
                    }}
                    disabled={submitting || pristine}
                  >
                    Reset
                  </button>
                </div>
              </form>
            )}
          />
        </>
      )}
    </>
  );
};
export default LogInForm;
