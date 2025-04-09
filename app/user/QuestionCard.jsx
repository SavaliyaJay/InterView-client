import React from "react";

const QuestionCard = ({ questions }) => {
  return (
    <div className="bg-black/40 backdrop-blur-md p-5 rounded-xl border border-gray-800/50 w-full shadow-lg shadow-black/20 transition-all duration-300 hover:border-blue-600/30">
      <div className="flex items-center mb-3">
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mr-3">
          <i className="bi bi-question-lg text-white text-sm"></i>
        </div>
        <span className="text-blue-300 font-semibold">Interview Question</span>
      </div>

      <div className="pl-9">
        <span className="text-white text-lg font-medium leading-relaxed">
          {questions
            ? questions?.question
            : "No question available. Please select a category to begin."}
        </span>
      </div>

      {questions && (
        <div className="mt-4 pl-9 flex gap-4">
          <div className="text-xs bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full border border-blue-500/20">
            Technical
          </div>
          <div className="text-xs bg-purple-900/30 text-purple-300 px-3 py-1 rounded-full border border-purple-500/20">
            Medium
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
