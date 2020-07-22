import React, { MouseEvent } from "react";
import "./header.scss";
import { useDispatch, useSelector } from "react-redux";
import { signOutStart } from "../../redux/user/user.actions";
import { AppState } from "../../redux/rootReducer";
import { UserState } from "../../redux/user/user.reducer";
import { SmileTwoTone } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { Button } from "antd";



export const Header = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector<AppState, UserState>(
    state => state.user
  );
  return (
    <div className="headerContainer">
      <Link to="/">
        <SmileTwoTone className="logo" />
      </Link>
      <div className="linksContainer">
        <Link className="makeSurveyBtn" to="/constructor">создать опрос</Link>
        {
          currentUser ?
            <Link className="signInOutBtn" onClick={(e: MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              dispatch(signOutStart());
            }} to="#">выйти</Link>
            :
            <Link to="/signInAndSignUp" className="signInOutBtn">войти</Link>
        }
      </div>
    </div>
  )
}