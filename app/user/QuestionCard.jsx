import React from "react";

const QuestionCard = ({ questions }) => {
  return (
    <div className="bg-[#fff] p-3 rounded-md">
      <b>Question: </b>
      {questions ? questions?.question : "No question available"}
    </div>
  );
};

export default QuestionCard;
