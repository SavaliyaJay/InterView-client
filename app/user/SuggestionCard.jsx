import React from "react";
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
    <div className="bg-black/40 backdrop-blur-md rounded-xl border border-gray-800/50 overflow-hidden shadow-lg shadow-black/20 transition-all duration-300 hover:border-purple-600/30">
      <div className="flex items-center justify-between p-4 border-b border-gray-800/50">
        <div className="flex items-center">
          <div className="h-6 w-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-3">
            <i className="bi bi-lightbulb text-white text-sm"></i>
          </div>
          <span className="text-purple-300 font-semibold">AI Feedback</span>
        </div>

        <Button
          disabled={loading || !answers?.answers?.a_id}
          variant="filled"
          className={`${
            loading || !answers?.answers?.a_id
              ? "bg-gray-800/70 text-gray-500"
              : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          } font-medium rounded-lg px-4 py-2 transition-all duration-300 shadow-lg shadow-purple-900/20 flex items-center gap-2`}
          onClick={handleSuggestion}
        >
          {loading ? (
            <Spinner color="blue" className="h-4 w-4" />
          ) : (
            <i className="bi bi-magic text-lg"></i>
          )}
          Generate Feedback
        </Button>
      </div>

      <div className="p-5">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8 gap-3">
            <Spinner color="purple" className="h-10 w-10" />
            <div className="text-gray-400">Analyzing your response...</div>
          </div>
        ) : suggestion ? (
          <div className="text-white bg-gray-900/30 backdrop-blur-sm p-5 rounded-xl border border-purple-500/20">
            <ReactMarkdown
              children={suggestion.text}
              components={{
                h1: ({ node, ...props }) => (
                  <h1 className="text-2xl font-bold mb-4 text-purple-300" {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 className="text-xl font-bold mb-3 text-purple-200" {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 className="text-lg font-bold mb-2 text-blue-300" {...props} />
                ),
                p: ({ node, ...props }) => (
                  <p className="mb-4 text-gray-200 leading-relaxed" {...props} />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="list-disc pl-6 mb-4 space-y-1" {...props} />
                ),
                ol: ({ node, ...props }) => (
                  <ol className="list-decimal pl-6 mb-4 space-y-1" {...props} />
                ),
                li: ({ node, ...props }) => <li className="text-gray-300" {...props} />,
                strong: ({ node, ...props }) => (
                  <strong className="font-bold text-blue-300" {...props} />
                )
              }}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-gray-900 flex items-center justify-center">
              <i className="bi bi-lightbulb text-gray-600 text-xl"></i>
            </div>
            <span className="text-gray-400 text-center">
              Submit your answer and click "Generate Feedback" to receive AI-powered suggestions
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuggestionCard;
