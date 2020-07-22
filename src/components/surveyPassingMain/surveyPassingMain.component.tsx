import React, { useState } from "react";
import { Typography, Button } from "antd";
import { SelectSurveys } from "../../redux/surveys/surveys.hooks";
import { useParams, useHistory } from "react-router-dom";
import { Modal } from "antd";
import { QuestionToAntwort } from "../questionToAntwort/questionToAntwort";

import "./surveyPassingMain.styles.scss";
import { addAnswerToCollection } from "../../firebase/firebase.utils";
import { SelectUser } from "../../redux/user/user.hooks";


export type Answer = {
  questionTitle: string;
  questionId: string;
  value: string | number | null;
};


export const SurveyPassingMain = () => {
  const { surveyId } = useParams();
  const { Title } = Typography;
  const surveys = SelectSurveys();
  const history = useHistory();
  const currentSurvey = surveys.find(item => item.id === surveyId);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answersArray, setAnswersArray] = useState<Answer[]>([]);
  const [isTheLast, toggleIsTheLast] = useState<boolean>(currentSurvey && currentSurvey.questions.length === 1 ? true : false);
  const user = SelectUser();

  const countDown = () => {
    let secondsToGo = 4;
    const modal = Modal.success({
      title: 'This is a notification message',
      content: `спасибо за прохождение опроса.Если вы зарегистрированы, ваши данные отправлены на сервер`,
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
    }, secondsToGo * 1000);
  }




  const handleSubmit = (value: string | undefined | number) => {
    if(currentSurvey)
    setAnswersArray([...answersArray, { 
      questionTitle: currentSurvey.title,
      questionId: currentSurvey.id,
      value: value ? value : null
    }])
    if (currentSurvey && currentIndex === currentSurvey.questions.length - 1) {
      if(user.currentUser) addAnswerToCollection(currentSurvey.id, user.currentUser.id, answersArray);
      countDown();
      history.push("/");
    }
    else {
      setCurrentIndex(currentIndex + 1)
    }
    if (currentSurvey && currentIndex === currentSurvey.questions.length - 2) toggleIsTheLast(true);
  }





  return (
    <>
      {
        currentSurvey ?
          <div className="surveyPassingContainer">
            <Title level={4}>{currentSurvey.title}</Title>
            <QuestionToAntwort item={currentSurvey.questions[currentIndex]} handleSubmit={handleSubmit} isTheLast={isTheLast} />
          </div>
          :
          Modal.error({
            title: 'This is an error message',
            content: 'some messages...some messages...',
            onOk: () => {
              history.push("/");
            }
          })
      }
    </>
  )
};