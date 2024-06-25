import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { fetchSuggestionThunkAction } from "@/redux/content/action";
import { selectContentList } from "@/redux/content/selectors";
import { Button, Spinner } from "@material-tailwind/react";

const SuggestionCard = () => {
  const dispatch = useDispatch();
  const { answers, suggestion, loading } = useSelector(selectContentList);

  const handleSuggestion = () => {
    const data = {
      questionId: answers?.answers?.questionId,
      answerId: answers?.answers?.a_id
    };
    dispatch(fetchSuggestionThunkAction(data));
  };

  return (
    <div className="bg-[#fff] rounded-md p-3">
      <div className="flex items-center justify-center w-full">
        <Button disabled={loading} variant="filled" color="blue" onClick={handleSuggestion}>
          Give Suggestion
        </Button>
      </div>
      <div className="p-3 rounded-md mt-2">
        <b>Suggestion:</b>{" "}
        {loading ? (
          <>
            <div className="flex  items-center justify-center w-full">
              <Spinner color="blue" />
            </div>
          </>
        ) : suggestion ? (
          <ReactMarkdown children={suggestion.text} />
        ) : (
          "No suggestion available"
        )}
      </div>
    </div>
  );
};

export default SuggestionCard;
