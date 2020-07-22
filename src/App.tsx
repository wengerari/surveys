import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { HomePage } from "./pages/homepage/homepage.component";

import "./app.scss";
import { ConstructorPage } from "./pages/constructor/constructor.component";
import { SurveyPassing } from "./pages/surveyPassing/surveyPassing.component";
import { Header } from "./components/header/header.component";
import { SignInAndSignUpPage } from "./pages/signInAndSignUp/signInAndSignUp.component";
import { useDispatch, useSelector } from "react-redux";
import { checkUserSession } from "./redux/user/user.actions";
import { AppState } from "./redux/rootReducer";
import { UserState } from "./redux/user/user.reducer";

function App() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector<AppState, UserState>(
    state => state.user
  );
  useEffect(() => {
    dispatch(checkUserSession());
  }, [checkUserSession]);
  return (
    <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            exact
            path="/signInAndSignUp"
            render={() => currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />}
          />
          <Route exact path="/constructor" component={ConstructorPage} />
          <Route path="/constructor/:surveyId" component={ConstructorPage} />
          <Route path="/surveyPassing/:surveyId" component={SurveyPassing} />
        </Switch>
    </div>
  );
}

export default App;
