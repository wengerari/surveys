import React, {
  useState,
  ChangeEvent,
  MouseEvent,
  useRef,
  useEffect
} from "react";
import { useDispatch } from "react-redux";
import { Input, DatePicker, Button } from "antd";
import {
  QuestionConstructor,
  RefTypes
} from "../../components/questionConstructor/questionConstructor.component";
import { QuestionList } from "../../components/questionsList/questionsList.component";
import { addSurveyStart, updateSurveyStart } from "../../redux/surveys/surveys.actions";
import { Question } from "../../redux/surveys/surveys.types";
import { Form } from "antd";
import { useParams, useHistory } from "react-router-dom";
import { SelectSurveys } from "../../redux/surveys/surveys.hooks";
import moment from 'moment';

import "./constructor.styles.scss";
import { Store } from "antd/lib/form/interface";

import { SelectUser } from "../../redux/user/user.hooks";

export const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 12,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 12,
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
      span: 18,
      offset: 6,
    },
  },
};


export const ConstructorPage = () => {
  const dispatch = useDispatch();
  const user = SelectUser();
  const { surveyId } = useParams();
  const [questionsArray, setQuestions] = useState<Question[] | []>([]);
  const [questionToChange, setQuestionToChange] = useState<Question>();
  const ref = useRef<RefTypes>(null);
  const [changeModus, toggleChangeModus] = useState<boolean>(false);
  const surveys = SelectSurveys();
  const [form] = Form.useForm();
  const history = useHistory();

  useEffect(() => {
    if (surveyId) {
      const surveyToChange = surveys.find(item => item.id === surveyId);
      if (surveyToChange) {
        form.setFieldsValue({
          title: surveyToChange.title,
          dateStart: moment(surveyToChange.dateStart),
          dateEnd: moment(surveyToChange.dateEnd)
        });
        setQuestions(surveyToChange.questions);
      }
      else {
        history.push("/constructor");
      }
    }
  }, []);


  const addQuestionFn = (questionToAdd: Question) => {
    setQuestions([...questionsArray, questionToAdd]);
  };

  const changeQusestion = (questionToChange: Question) => {
    const copedArray = [...questionsArray];
    copedArray[questionsArray.findIndex(item => item.id === questionToChange.id)] = questionToChange;
    setQuestions(copedArray);
    toggleChangeModus(false);
  };

  const cancelFn = () => {
    toggleChangeModus(false);
  };


  const deleteQuestion = (key: number, e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setQuestions(questionsArray.filter((item, index) => index !== key));
  };

  const duplicateQuestion = (key: number, e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const itemToDuplicate = questionsArray.find((item, index) => index === key);
    if (itemToDuplicate) {
      setQuestions((prevArray) => [...prevArray, itemToDuplicate]);
    }
  };

  const changeQuestion = async (
    key: number,
    e: MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    toggleChangeModus(true);
    await setQuestionToChange(
      questionsArray.find((item, index) => index === key)
    );
    if (ref.current) ref.current.handleChange();
  };
  return (
    <div className="constructorContainer">
      <div className="formContainer">
        <Form
          {...formItemLayout}
          form={form}
          name="surveyForm"
          onFinish={(values: Store) => {
            const { title, dateStart, dateEnd } = values;
            if (surveyId && dateEnd && title && dateStart) {
              dispatch(updateSurveyStart({
                userId: user.currentUser ? user.currentUser.id : null,
                surveyToChange: {
                  id: surveyId,
                  title,
                  dateStart: new Date(dateStart),
                  dateEnd: new Date(dateEnd),
                  questions: questionsArray
                }
              }));
            }
            else {
              if (title && dateStart && dateEnd) {
                dispatch(addSurveyStart({
                  userId: user.currentUser ? user.currentUser.id : null,
                  title,
                  dateStart: new Date(dateStart),
                  dateEnd: new Date(dateEnd),
                  questions: questionsArray
                }))
              }
            }
            history.push("/");
          }}
        >
          <Form.Item
            label="Название опроса"
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
            label="начало опроса"
            name="dateStart"
            rules={[
              {
                required: true,
                message: "введите дату начала"
              }
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="окончание опроса"
            name="dateEnd"
            rules={[
              {
                required: true,
                message: "введите дату окончания"
              }
            ]}
          >
            <DatePicker />
          </Form.Item>
          {
            questionsArray.length > 0 ?
              <QuestionList
                questionsArray={questionsArray}
                deleteQuestion={deleteQuestion}
                duplicateQuestion={duplicateQuestion}
                changeQuestion={changeQuestion}
              />
              : null
          }
          <QuestionConstructor
            ref={ref}
            questionToChange={questionToChange}
            addQuestionFn={addQuestionFn}
            changeModus={changeModus}
            cancelFn={cancelFn}
            changeQusestion={changeQusestion}
          />
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              {surveyId ? "изменить опрос" : "сохранить опрос"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
