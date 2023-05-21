import React, { useState } from "react";
import { useFormik } from "formik";
import { ValidationUser } from "../ValidationScheme/ValidationUser";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import PopupModal from "../ModalPopup/PopupModal";
import axios from "axios";

const RegisterForm = ({ setSignIn }) => {
  const [isSubmitForm, setIsSubmitForm] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: ValidationUser,
    onSubmit: async (values, action) => {
      try {
        await axios
          .get(
            "https://api.themoviedb.org/3/authentication/token/new?api_key=39b7c306441823329a6e5fa506a7906c"
          )
          .then((res) => {
            if (res && res.status === 200) {
              // console.log(res.data);

              localStorage.setItem(
                "tokenRequest",
                JSON.stringify(res.data.request_token)
              );
            }
          });
      } catch (error) {
        console.log(error);
      }
      setIsSubmitForm(true);

      action.resetForm();
      // axios.post(url, values)
      //.then((res)=>{
      /// if (res && res.status === 200){
      //  console.log(res.data)
      //  localStorage.setItem('tokenUser', JSON.stringify(res.data.token));
      //  setUserLogin(true);
      //  }
      //.catch((err)=>{
      // console.log(err)})
      //})
    },
  });

  return (
    <>
      {isSubmitForm ? (
        <PopupModal setIsSubmitForm={setIsSubmitForm} authModal={false} />
      ) : (
        <div className="bckground-form">
          <div>
            <h1>Looking for BEST Movies, TV Shows and more?</h1>
            <h4>Just sign up here and start watching.</h4>
          </div>

          <div className="container-form form-border">
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="firstName">First Name:</Form.Label>
                <Form.Control
                  id="firstName"
                  name="firstName"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                  placeholder="Enter name"
                />

                {formik.touched.firstName && formik.errors.firstName ? (
                  <Form.Text className="text-muted">
                    {formik.errors.firstName}
                  </Form.Text>
                ) : (
                  ""
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="lastName">Last Name:</Form.Label>
                <Form.Control
                  id="lastName"
                  name="lastName"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                  placeholder="Enter last name"
                />

                {formik.touched.lastName && formik.errors.lastName ? (
                  <Form.Text className="text-muted">
                    {formik.errors.lastName}
                  </Form.Text>
                ) : (
                  ""
                )}
              </Form.Group>

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
                <Form.Label htmlFor="email">Email address:</Form.Label>
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
                <Form.Label htmlFor="password">Password:</Form.Label>
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

              <Form.Group className="mb-5">
                <Form.Label htmlFor="confirmPassword">
                  Confirm Password:
                </Form.Label>
                <Form.Control
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  placeholder="Repeat Password"
                />

                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <Form.Text className="text-muted">
                    {formik.errors.confirmPassword}
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
                Register Now
              </Button>

              <div className="flex-login">
                <Form.Text className="text-muted">
                  Already have a account?
                </Form.Text>
                <Button onClick={() => setSignIn(true)}>Sign In</Button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterForm;
