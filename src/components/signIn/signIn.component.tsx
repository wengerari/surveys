import React from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button } from "antd";
import { googleSignInStart, emailSignInStart } from "../../redux/user/user.actions";
import "./signIn.styles.scss";

import { formItemLayout, tailFormItemLayout } from "../signUp/signUp.component";
import { Store } from "antd/lib/form/interface";


export const SignIn = () => {
  const dispatch = useDispatch();
  const onFinish = (values: Store) => {
    const {email, password} = values;
    dispatch(emailSignInStart({email, password}));
  }
  return (
    <>
      <Form
        {...formItemLayout}
        name="signIn"
        style={{width:"50%"}}
        onFinish={onFinish}
      >
        <Form.Item
          label="email"
          name="email"
          rules={[
            {
              type: 'email',
              message: 'введенное значение не верно',
            },
            {
              required: true,
              message: 'пожалуйста, введите ваш E-mail!',
            },
          ]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <div className="buttonsContainer">
            <Button type="primary" htmlType="submit">
              sign in
        </Button>
            <Button onClick={() => dispatch(googleSignInStart())} className="signInWithGoogleBtn">войти через google</Button>
          </div>
        </Form.Item>
      </Form>
    </>
  )
}