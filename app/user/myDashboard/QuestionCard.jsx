import React, { useEffect } from "react";

const QuestionCard = ({ content }) => {
  useEffect(() => {
    console.log("QuestionCard: ", content);
  }, [content]);
  return (
    <>
      <div className="bg-[#fff] p-1 rounded-md">QuestionCard: {content} </div>
    </>
  );
};

export default QuestionCard;
