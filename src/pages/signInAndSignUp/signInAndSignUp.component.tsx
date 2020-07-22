import React from "react";
import { SignIn } from "../../components/signIn/signIn.component";

import "./signInAndSignUp.styles.scss";
import { SignUp } from "../../components/signUp/signUp.component";

export const SignInAndSignUpPage = () => {
  return (
    <div className="signInAndSignUpContainer">
      <SignIn />
      <SignUp />
    </div>
  )
}