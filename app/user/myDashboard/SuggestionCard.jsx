import { selectContentList } from "@/redux/content/selectors";
import { Button } from "@material-tailwind/react";
import React from "react";
import { useSelector } from "react-redux";

const SuggestionCard = () => {
  const { answers, questions } = useSelector(selectContentList);
  console.log("answers", answers?.answers?.a_id, answers?.answers?.questionId);
  return (
    <>
      <div className="bg-[#fff] rounded-md p-3">
        <div className="flex items-center justify-center w-full ">
          <Button variant="filled" color="blue">
            Give Suggestion
          </Button>
        </div>
        {questions ? questions?.question : "No question available"}
        <div className=" p-3 rounded-md mt-2">SuggestionCard</div>
      </div>
    </>
  );
};

export default SuggestionCard;
