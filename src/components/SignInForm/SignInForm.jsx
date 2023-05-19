import { useFormik } from "formik";
import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { ValidationUser } from "../ValidationScheme/ValidationUser";
import axios from "axios";
import MovieContext from "../../context/MovieContext";

const SignInForm = ({ setSignIn }) => {
  const navigate = useNavigate();

  const { setUserLogin } = useContext(MovieContext);

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: ValidationUser,
    onSubmit: async (values, action) => {
      console.log(values);

      // try {
      //   await axios
      //     .post(
      //       "https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=39b7c306441823329a6e5fa506a7906c",
      //       {
      //         username: JSON.stringify(values.userName),
      //         password: JSON.stringify(values.password),
      //         request_token: JSON.parse(localStorage.getItem("tokenRequest")),
      //       }
      //     )
      //     .then((res) => {
      //       console.log("login", res.data);
      //       setUserLogin(true);
      //     });
      // } catch (error) {
      //   console.log(error);
      // }
      // action.resetForm();
      // gotoHome button izbrisati
    },
  });

  // useEffect(()=>{

  // AuthService.checkUser({email: email})
  // .then(()=>{
  // if (res && res.status === 200){
  //  goToHome();
  //  }
  //.catch((err)=>{
  //  console.log(err)})
  // });

  // },[values])

  const goToHome = () => {
    navigate("/home");
    localStorage.setItem("tokenSession", JSON.stringify("3423tsfdqwe"));
    //dispatch setUser(values)
    setUserLogin(true);
  };

  return (
    <div className="bckground-form relative">
      <div className="container-form absolute form-border">
        <Form>
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

          <div className="flex-login">
            <Form.Text className="text-muted">Don't have a account?</Form.Text>
            <Button onClick={() => setSignIn(false)}>Register Here</Button>
          </div>
          <Button
            className="mt-3"
            variant="warning"
            onClick={goToHome}
            // type="submit"
          >
            Sign in
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SignInForm;
