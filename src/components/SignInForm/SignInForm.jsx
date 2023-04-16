import { useFormik } from "formik";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { ValidationUser } from "../ValidationScheme/ValidationUser";

const SignInForm = ({ setSignIn }) => {
  const navigate = useNavigate();
  //i need to make validation scheme
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: ValidationUser,
    onSubmit: async (values, action) => {
      console.log(values);
      await new Promise((resolve) => setTimeout(resolve, 500));
      action.resetForm();
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
    //localStorage.setItem('user',JSON.stringify(Pera))
    //dispatch setUser(values)
    //setUserLogin(true);
  };

  return (
    <div className="bckground relative">
      <div className="container-form absolute form-border text-center">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Email address:</Form.Label>
            <Form.Control
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="Enter email"
            />

            {formik.touched.email && formik.errors.email ? (
              <Form.Text className="text-muted">
                {formik.errors.email}
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
            type="submit"
          >
            Sign in
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SignInForm;
