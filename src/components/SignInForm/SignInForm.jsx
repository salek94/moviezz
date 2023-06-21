import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { ValidationUserLogin } from "../ValidationScheme/ValidationUser";
import axios from "axios";
import MovieContext from "../../context/MovieContext";

const SignInForm = ({ setSignIn }) => {
  const navigate = useNavigate();

  const { setAuth } = useContext(MovieContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [request, setRequest] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: ValidationUserLogin,
    onSubmit: async (values, action) => {
      try {
        await axios
          .get(
            "https://api.themoviedb.org/3/authentication/token/new?api_key=39b7c306441823329a6e5fa506a7906c"
          )
          .then((res) => {
            if (res && res.status === 200) {
              setRequest(res.data.request_token);
              setPassword(values.password);
              setUsername(values.userName);
            }
          });
      } catch (error) {
        console.log(error);
      }
      action.resetForm();
    },
  });

  useEffect(() => {
    if (isMounted) {
      axios
        .post(
          "https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=39b7c306441823329a6e5fa506a7906c",
          {
            username: username,
            password: password,
            request_token: request,
          }
        )
        .then((res) => {
          console.log("login", res.data);
          localStorage.setItem(
            "tokenRequest",
            JSON.stringify(res.data.request_token)
          );
          setAuth(true);
          navigate("/home");
        })
        .catch((error) => {
          console.log(error);
        });
    } else setIsMounted(true);
  }, [request]);

  return (
    <div className="bckground-form relative">
      <div className="container-form absolute form-border">
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="userName">Username:</Form.Label>
            <Form.Control
              id="userName"
              name="userName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.userName}
              placeholder="Enter username"
            />

            {formik.touched.userName && formik.errors.userName ? (
              <Form.Text className="text-muted">
                {formik.errors.userName}
              </Form.Text>
            ) : (
              ""
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="Password"
            />

            {formik.touched.password && formik.errors.password ? (
              <Form.Text className="text-muted">
                {formik.errors.password}
              </Form.Text>
            ) : (
              ""
            )}
          </Form.Group>
          <Button
            className="mb-3"
            variant="warning"
            type="submit"
            disabled={formik.isSubmitting}
          >
            Sign In
          </Button>
          <div className="flex-login">
            <Form.Text className="text-muted">Don't have a account?</Form.Text>
            <Button onClick={() => setSignIn(false)}>Register Here</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignInForm;
