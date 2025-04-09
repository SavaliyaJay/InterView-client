import { Button, Textarea } from "@material-tailwind/react";
import React, { useState, useEffect, useRef } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "regenerator-runtime/runtime";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAnswerOfQuestionThunkAction,
  postAnswerThunkAction,
  putAnswerOfQuestionThunkAction
} from "@/redux/content/action";
import { selectContentList } from "@/redux/content/selectors";

const AnswerCard = ({ questions, keyProp }) => {
  const dispatch = useDispatch();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [answer, setAnswer] = useState("");
  const processedLengthRef = useRef(0);
  const { answers } = useSelector(selectContentList);
  const [updateAnswer, setUpdateAnswer] = useState(false);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (questions?.q_id) {
      dispatch(fetchAnswerOfQuestionThunkAction(questions?.q_id));
    }
  }, [questions, dispatch]);

  useEffect(() => {
    if (answer) {
      setCharCount(answer.length);
    } else {
      setCharCount(0);
    }
  }, [answer]);

  const startListening = () => {
    setIsListening(true);
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  };

  const stopListening = () => {
    setIsListening(false);
    setIsSpeaking(false);
    SpeechRecognition.stopListening();
  };

  useEffect(() => {
    if (transcript.length > processedLengthRef.current) {
      const newTranscript = transcript.slice(processedLengthRef.current);
      setAnswer((prevStory) => `${prevStory}${newTranscript}`.trim());
      processedLengthRef.current = transcript.length;

      const timeoutId = setTimeout(() => {
        setIsSpeaking(false);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [transcript]);

  const handleManualChange = (event) => {
    setAnswer(event.target.value);
  };

  useEffect(() => {
    setAnswer("");
    processedLengthRef.current = 0;
    resetTranscript();
  }, [keyProp, resetTranscript]);

  const handleSubmit = async () => {
    if (answer.trim() === "") {
      toast.error("Please write your answer before submitting.", {
        style: {
          background: "rgba(0, 0, 0, 0.8)",
          color: "#fff",
          borderRadius: "10px",
          border: "1px solid rgba(59, 130, 246, 0.3)"
        },
        iconTheme: {
          primary: "#ef4444",
          secondary: "#fff"
        }
      });
      return;
    }

    const question_id = questions?.q_id;
    if (!question_id) {
      toast.error("No question found to post answer", {
        style: {
          background: "rgba(0, 0, 0, 0.8)",
          color: "#fff",
          borderRadius: "10px",
          border: "1px solid rgba(59, 130, 246, 0.3)"
        }
      });
      return;
    }

    if (updateAnswer) {
      await dispatch(
        putAnswerOfQuestionThunkAction({ answer, question_id, answer_id: answers.answers.a_id })
      );
      toast.success("Answer updated successfully!", {
        style: {
          background: "rgba(0, 0, 0, 0.8)",
          color: "#fff",
          borderRadius: "10px",
          border: "1px solid rgba(59, 130, 246, 0.3)"
        },
        iconTheme: {
          primary: "#22c55e",
          secondary: "#fff"
        }
      });
      setUpdateAnswer(false);
    } else {
      await dispatch(postAnswerThunkAction({ answer, question_id }));
      toast.success("Answer submitted successfully!", {
        style: {
          background: "rgba(0, 0, 0, 0.8)",
          color: "#fff",
          borderRadius: "10px",
          border: "1px solid rgba(59, 130, 246, 0.3)"
        },
        iconTheme: {
          primary: "#22c55e",
          secondary: "#fff"
        }
      });
    }
    dispatch(fetchAnswerOfQuestionThunkAction(question_id));
  };

  const handleUpdateSubmit = () => {
    setAnswer(answers.answers.answer);
    setUpdateAnswer(true);
  };

  return (
    <div className="p-5 rounded-lg w-full h-full">
      <div className="flex items-center mb-3">
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center mr-3">
          <i className="bi bi-pencil text-white text-sm"></i>
        </div>
        <span className="text-indigo-300 font-semibold">Your Response</span>
      </div>

      {answers && (
        <div className="mt-2 w-full">
          {!updateAnswer && answers && answers.answers ? (
            <div className="bg-gray-900/50 backdrop-blur-md p-5 rounded-xl border border-gray-800/50 transition-all duration-300 hover:border-indigo-600/30">
              <div className="mb-3">
                <span className="text-white text-lg break-words leading-relaxed">
                  {answers.answers.answer}
                </span>
              </div>
              <div className="flex justify-end items-center mt-5">
                <Button
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-medium rounded-lg px-5 py-2.5 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-900/20 flex items-center gap-2"
                  onClick={handleUpdateSubmit}
                >
                  <i className="bi bi-pencil-square"></i>
                  Update Response
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-900/30 backdrop-blur-md rounded-xl border border-gray-800/50 p-1 transition-all duration-300">
              <Textarea
                color="blue-gray"
                label="Type your answer here..."
                value={answer}
                onChange={handleManualChange}
                className="min-h-[180px] bg-transparent text-white resize-none px-4 py-3 text-lg"
                labelProps={{
                  className: "text-gray-400 font-normal"
                }}
                // containerProps={{
                //   className: "focus-within:ring-2 focus-within:ring-blue-500 rounded-lg"
                // }}
              />

              <div className="flex justify-between items-center p-3">
                <div className="text-gray-400 text-sm">{charCount} characters</div>

                {browserSupportsSpeechRecognition ? (
                  <div className="flex items-center gap-4">
                    <button
                      id="listen-button"
                      className={`flex items-center justify-center w-12 h-12 ${
                        isListening
                          ? "bg-red-500 text-white"
                          : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                      } rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/30 ${
                        isSpeaking ? "scale-110 ring-4 ring-purple-500/20" : "scale-100"
                      }`}
                      onClick={isListening ? stopListening : startListening}
                    >
                      <i className={`bi ${isListening ? "bi-mic-mute" : "bi-mic"} text-xl`}></i>
                    </button>

                    <Button
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium rounded-lg px-5 py-2.5 transition-all duration-300 shadow-lg shadow-blue-900/20 flex items-center gap-2"
                      onClick={handleSubmit}
                    >
                      <i className="bi bi-send"></i>
                      Submit
                    </Button>
                  </div>
                ) : (
                  <Button
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium rounded-lg px-5 py-2.5 transition-all duration-300 shadow-lg shadow-blue-900/20 flex items-center gap-2"
                    onClick={handleSubmit}
                  >
                    <i className="bi bi-send"></i>
                    Submit
                  </Button>
                )}
              </div>

              {isListening && (
                <div className="flex justify-center mt-2 mb-3">
                  <div className="flex gap-1 items-center">
                    <div className="bg-red-500 h-2 w-2 rounded-full animate-pulse"></div>
                    <div className="bg-red-500 h-3 w-3 rounded-full animate-pulse delay-75"></div>
                    <div className="bg-red-500 h-4 w-4 rounded-full animate-pulse delay-150"></div>
                    <div className="text-red-400 text-sm ml-2">Recording your voice...</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AnswerCard;
