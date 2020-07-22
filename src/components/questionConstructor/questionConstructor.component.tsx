import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef
} from "react";
import { Button, Input, Radio, Form, Switch, InputNumber } from "antd";
import Modal from "antd/lib/modal/Modal";
import TextArea from "antd/lib/input/TextArea";
import { Question } from "../../redux/surveys/surveys.types";

import "./questionConstructor.styles.scss";
import { Store } from "antd/lib/form/interface";
import { RadioChangeEvent } from "antd/lib/radio";


export type RefTypes = {
  handleChange: () => void;
};


type PropTypes = {
  children?: never;
  addQuestionFn: (questionToAdd: Question) => void;
  questionToChange?: Question;
  changeModus: boolean;
  cancelFn: () => void;
  changeQusestion: (questionToChange: Question) => void;
};

export const QuestionConstructor = forwardRef<RefTypes, PropTypes>(
  ({ addQuestionFn, questionToChange, changeModus, cancelFn, changeQusestion }, ref) => {
    const [typeValue, setTypeValue] = useState<string | null>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [form] = Form.useForm();

    useImperativeHandle(ref, () => ({
      handleChange: () => {
        console.log(questionToChange)
        if (questionToChange)
          form.setFieldsValue(questionToChange);
        setIsModalOpen(true);
      }
    }));


    const handleCancel = () => {
      if (changeModus) {
        form.resetFields();
        cancelFn();
      }
      setIsModalOpen(false);
    };



    const onFinish = (values: Store) => {
      const objToDispatch: any = {};
      Object.keys(values).map(item => {
        if(item === "choiceValues") {
          objToDispatch[item] = values[item].split("\n");
          return;
        }
        if (values[item] !== undefined) objToDispatch[item] = values[item]
      })
      changeModus && questionToChange ? changeQusestion({ ...objToDispatch, id: questionToChange.id }) : addQuestionFn({ ...objToDispatch, id: Math.random() });
      setTypeValue(null);
      setIsModalOpen(false);
      form.resetFields();
    }

    

    useEffect(() => { if (questionToChange) setTypeValue(questionToChange.type) }, [questionToChange]);

    return (
      <div className="qustionConstractorContainer">
        <Button className="addQuestionBtn" type="primary" onClick={() => setIsModalOpen(true)}>
          Добавить вопрос
        </Button>
        <Modal
          title="Basic Modal"
          visible={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            name="questionForm"
            onFinish={onFinish}
          >
            <Form.Item
              label="Название вопроса"
              name="title"
              rules={[
                {
                  required: true,
                  message: "введите название"
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="тип вопроса"
              name="type"
              rules={[
                {
                  required: true,
                  message: "выберите тип"
                }
              ]}
            >
              <Radio.Group onChange={(e: RadioChangeEvent) => setTypeValue(e.target.value)}>
                <Radio value="text">текс</Radio>
                <Radio value="multilineText">многострочный текст</Radio>
                <Radio value="number">число</Radio>
                <Radio value="date">дата</Radio>
                <Radio value="choice">выбор</Radio>
                <Radio value="scale">шкала</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Обязателен ли вопрос"
              name="isRequired"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            {(() => {
              switch (typeValue) {
                case "number":
                  return (
                    <>
                      <Form.Item label="минимальное значение" name="minValue" >
                        <InputNumber />
                      </Form.Item>
                      <Form.Item label="максимальное значение" name="maxValue">
                        <InputNumber />
                      </Form.Item>
                    </>
                  );
                case "date":
                  return (
                    <>
                      <Form.Item
                        label="формат даты и времени"
                        name="dateFormat"
                      >
                        <Radio.Group >
                          <Radio value="onlyDate">только дата</Radio>
                          <Radio value="dateAndTime">дата и время</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </>
                  );
                case "choice":
                  return (
                    <>
                      <Form.Item
                        label="введите каждое значение в отдельной строчке"
                        name="choiceValues"
                      >
                        <TextArea />
                      </Form.Item>
                    </>
                  );
                case "scale":
                  return (
                    <>
                      <Form.Item label="начальное значение" name="scaleStartValue">
                        <InputNumber />
                      </Form.Item>
                      <Form.Item label="конечное значение" name="scaleEndValue">
                        <InputNumber />
                      </Form.Item>
                    </>
                  );
              }
            })()}
            <Form.Item>
              <div className="buttonsContainer">
                <Button onClick={handleCancel}>chanel</Button>
                <Button type="primary" htmlType="submit">добавить вопрос</Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
);
