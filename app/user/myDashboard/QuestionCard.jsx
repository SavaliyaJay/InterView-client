import React from "react";

const QuestionCard = ({ questions }) => {
  return (
    <div className="bg-[#fff] p-1 rounded-md">
      {questions ? questions[0]?.question : "No question available"}
    </div>
  );
};

export default QuestionCard;
