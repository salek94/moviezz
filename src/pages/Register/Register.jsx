import React, { useState } from "react";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import SignInForm from "../../components/SignInForm/SignInForm";
import "../Register/Register.scss";

const Register = () => {
  const [signIn, setSignIn] = useState(false);

  return (
    <div>
      {signIn ? (
        <SignInForm setSignIn={setSignIn} />
      ) : (
        <RegisterForm setSignIn={setSignIn} />
      )}
    </div>
  );
};

export default Register;
