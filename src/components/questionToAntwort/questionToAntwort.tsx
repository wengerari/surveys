import React from "react";
import { Question } from "../../redux/surveys/surveys.types";
import { Typography, Input, InputNumber, DatePicker, Slider, Button, Form, TimePicker, Checkbox } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Store } from "antd/lib/form/interface";

type PropTypes = {
  children?: never;
  item: Question;
  handleSubmit: (value: string | undefined | number) => void;
  isTheLast: boolean;
}


export const QuestionToAntwort = ({ item, handleSubmit, isTheLast }: PropTypes) => {
  const { Title } = Typography;


  const [form] = Form.useForm();

  return (
    <>
      <Title level={4}>{item.title}</Title>
      <Form
        form={form}
        layout="vertical"
        name="currentQuestion"
        onFinish={(values: Store) => handleSubmit(values[item.type])}
      >
        {(() => {
          switch (item.type) {
            case "text":
              return (
                <Form.Item
                  name="text"
                  rules={[
                    {
                      required: item.isRequired,
                      message: "введите название"
                    }
                  ]}>
                  <Input />
                </Form.Item>
              )
            case "multilineText":
              return (
                <Form.Item
                  name="multilineText"
                  rules={[
                    {
                      required: item.isRequired,
                      message: "введите название"
                    }
                  ]}>
                  <TextArea />
                </Form.Item>
              )
            case "number":
              return (
                <Form.Item
                  name="number"
                  rules={[{
                    required: item.isRequired,
                    message: 'Please input your password!'
                  },
                  () => ({
                    validator(rule, value) {
                      if(!item.minValue && !item.maxValue && Number.isInteger(value)) return Promise.resolve();
                      if (item.minValue && !item.maxValue) {
                        if (!value || value >= item.minValue) {
                          return Promise.resolve();
                        }
                      }
                      if (!item.minValue && item.maxValue) {
                        if (!value || value <= item.maxValue) {
                          return Promise.resolve();
                        }
                      }
                      if (item.minValue && item.maxValue) {
                        if (!value || value <= item.maxValue && value >= item.minValue) {
                          return Promise.resolve();
                        }
                      }
                      return Promise.reject("введите верное значение");
                    }
                  })
                  ]}
                >
                  <InputNumber />
                </Form.Item>
              )
            case "date":
              return (
                (item.dateFormat && item.dateFormat === "dateAndTime") ?
                  <>
                    <Form.Item
                      name="date"
                      rules={[
                        {
                          required: item.isRequired,
                          message: "введите название"
                        }
                      ]}>
                      <DatePicker />
                    </Form.Item>
                    <Form.Item
                      name="questionDate"
                      rules={[
                        {
                          required: item.isRequired,
                          message: "введите название"
                        }
                      ]}>
                      <TimePicker />
                    </Form.Item>
                  </>
                  : <Form.Item
                    name="date"
                    rules={[
                      {
                        required: item.isRequired,
                        message: "введите название"
                      }
                    ]}>
                    <TimePicker />
                  </Form.Item>
              )
            case "choice":
              return (
                <Form.Item
                  name="choice"
                  rules={[
                    {
                      required: item.isRequired,
                      message: "введите название"
                    }
                  ]}>
                  <Checkbox.Group options={item.choiceValues} />
                </Form.Item>
              )
            case "scale":
              return (
                <Form.Item
                  name="scale"
                  rules={[
                    {
                      required: item.isRequired,
                      message: "введите название"
                    }
                  ]}>
                  <Slider
                    min={item.scaleStartValue}
                    max={item.scaleEndValue}
                  />
                </Form.Item>
              )
          }
        })()}
        <Form.Item>
          <Button type="primary" htmlType="submit">{isTheLast ? "завершить опрос" : "ответить"}</Button>
        </Form.Item>
      </Form>
    </>
  )
}