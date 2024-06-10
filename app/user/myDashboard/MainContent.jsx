import React from "react";
import QuestionCard from "./QuestionCard";
import AnswerCard from "./AnswerCard";
import SuggestionCard from "./SuggestionCard";

const MainContent = ({ content }) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <QuestionCard content={content} />
        <AnswerCard content={content} />
        <SuggestionCard />
      </div>
    </>
  );
};

export default MainContent;
