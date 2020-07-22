import React, { MouseEvent } from "react";
import { Question } from "../../redux/surveys/surveys.types";
import { Table, Space } from "antd";



type Item = {
  key: number;
  title: string;
  type: string;
};

type PropTypes = {
  children?: never;
  questionsArray: Question[];
  deleteQuestion: (key: number, e: MouseEvent<HTMLAnchorElement>) => void;
  duplicateQuestion: (key: number, e: MouseEvent<HTMLAnchorElement>) => void;
  changeQuestion: (key: number, e: MouseEvent<HTMLAnchorElement>) => void;
};

export const QuestionList = ({
  questionsArray,
  deleteQuestion,
  duplicateQuestion,
  changeQuestion
}: PropTypes) => {
  const columns = [
    {
      title: "title",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "type",
      dataIndex: "type",
      key: "type"
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: Item) => (
        <Space size="middle">
          <a onClick={(e) => deleteQuestion(record.key, e)}>удалить</a>
          <a onClick={(e) => duplicateQuestion(record.key, e)}>дуюлировать</a>
          <a onClick={(e) => changeQuestion(record.key, e)}>редактировать</a>
        </Space>
      )
    }
  ];
  return (
    <>
      {questionsArray.length ? (
        <Table
          columns={columns}
          dataSource={questionsArray.map((item, index) => ({
            key: index,
            title: item.title,
            type: item.type
          }))}
          pagination={false}
        />
      ) : null}
    </>
  );
};
