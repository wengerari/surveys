import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { signUpStart } from "../../redux/user/user.actions";
import { Store } from "antd/lib/form/interface";


export const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 10,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};
export const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};


export const SignUp = () => {
  const dispatch = useDispatch();
  const onFinish = (values: Store) => {
    const {name, email, password} = values;
    dispatch(signUpStart({name, email, password}));
  }
  return (
    <>
      <Form
        {...formItemLayout}
        name="signUp"
        style={{ width: "50%" }}
        onFinish={onFinish}
      >
        <Form.Item
          label="введите имя"
          name="name"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!'
            },
            {
              type: 'email',
              message: 'The input is not valid E-mail!'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="подтвердите пароль"
          name="confirmPassword"
          rules={[{ required: true, message: 'Please input your password!' },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject("пароли не воспадают");
            }
          })
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            sign in
        </Button>
        </Form.Item>
      </Form>
    </>
  )
}