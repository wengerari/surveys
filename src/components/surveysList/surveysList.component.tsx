import React from "react";

import "./surveyList.styles.scss";

import { Space, Table } from "antd";
import { useHistory } from "react-router-dom";
import { SelectSurveys } from "../../redux/surveys/surveys.hooks";
import { useDispatch } from "react-redux";
import { deleteSurveyStart } from "../../redux/surveys/surveys.actions";
import { SelectUser } from "../../redux/user/user.hooks";


type Item = {
  key: number;
  id: string;
  title: string;
  dateStart: string;
  dateEnd: string;
};


export const SurveysList = () => {
  const dispatch = useDispatch();
  const surveys = SelectSurveys();
  const history = useHistory();
  const user = SelectUser();
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "title",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "dateStart",
      dataIndex: "dateStart",
      key: "dateStart"
    },
    {
      title: "dateEnd",
      dataIndex: "dateEnd",
      key: "dateEnd"
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: Item) => (
        <Space size="middle">
          <a onClick={e => {
            e.preventDefault();
            history.push(`/surveyPassing/${record.id}`);
          }}>пройти</a>
          <a onClick={e => {
            e.preventDefault();
            dispatch(deleteSurveyStart({
              userId: user.currentUser ? user.currentUser.id : null,
              surveyId: record.id
            }));
          }}>удалить</a>
          <a onClick={e => {
            e.preventDefault();
            history.push(`/constructor/${record.id}`);
          }}>редактировать</a>
        </Space>
      )
    }
  ];
  return (
    <div className="tableContainer">
      <Table
        columns={columns}
        dataSource={surveys.map((item, index) => ({
          key: Math.random(),
          id: item.id,
          title: item.title,
          dateStart: `${new Date(item.dateStart).getDate()}.${new Date(item.dateStart).getMonth()+1}.${new Date(item.dateStart).getFullYear()}`,
          dateEnd: `${new Date(item.dateEnd).getDate()}.${new Date(item.dateEnd).getMonth()+1}.${new Date(item.dateEnd).getFullYear()}`
        }))}
        pagination={false}
      />
    </div>
  );
};
