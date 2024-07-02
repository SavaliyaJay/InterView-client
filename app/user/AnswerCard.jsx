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

  useEffect(() => {
    if (questions?.q_id) {
      dispatch(fetchAnswerOfQuestionThunkAction(questions?.q_id));
    }
  }, [questions, dispatch]);

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
      toast.error("Please write your answer before submitting.");
      return;
    }

    const question_id = questions?.q_id;
    if (!question_id) {
      toast.error("No question found to post answer");
      return;
    }

    if (updateAnswer) {
      await dispatch(
        putAnswerOfQuestionThunkAction({ answer, question_id, answer_id: answers.answers.a_id })
      );
      setUpdateAnswer(false);
    } else {
      await dispatch(postAnswerThunkAction({ answer, question_id }));
    }
    dispatch(fetchAnswerOfQuestionThunkAction(question_id));
  };

  const handleUpdateSubmit = () => {
    setAnswer(answers.answers.answer);
    setUpdateAnswer(true);
  };

  return (
    <div className="p-3 rounded-md">
      <b>Write your answer here:</b>
      {answers && (
        <div className="bg-[#f1f1f1] p-3 rounded-md mt-2">
          <b>Your answer:</b>
          <p>
            {!updateAnswer && answers && answers.answers ? (
              <>
                <div className="mt-2">
                  <span className="break-words overflow-hidden">{answers.answers.answer}</span>
                  <div className="flex justify-end items-center mt-3">
                    <Button
                      className="bg-gradient-to-r from-blue-500 to-purple-400 text-white font-bold rounded-md hover:from-blue-700 hover:to-purple-600"
                      onClick={handleUpdateSubmit}
                    >
                      Update Answer
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="mt-2">
                <Textarea
                  color="blue-gray"
                  label="Message"
                  value={answer}
                  onChange={handleManualChange}
                />
                {!browserSupportsSpeechRecognition ? (
                  <>
                    <div className="flex justify-end items-center mt-3">
                      <Button
                        className="bg-gradient-to-r from-blue-500 to-purple-400 bg-clip-padding text-transparent bg-opacity-50 text-white font-bold rounded-md hover:from-blue-700 hover:to-purple-600"
                        onClick={handleSubmit}
                      >
                        Submit
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center mt-3">
                      <Button
                        id="listen-button"
                        className={`bg-gradient-to-r from-blue-500 to-purple-400 bg-clip-padding text-transparent bg-opacity-50 text-white font-bold hover:from-blue-700 hover:to-purple-600 rounded-full p-3 transition-transform duration-300 ${isSpeaking ? "transform scale-125" : "transform scale-100"}`}
                        onClick={isListening ? stopListening : startListening}
                      >
                        {isListening ? (
                          <i className="bi bi-mic-mute"></i>
                        ) : (
                          <i className="bi bi-mic"></i>
                        )}
                      </Button>
                      <Button
                        className="bg-gradient-to-r from-blue-500 to-purple-400 bg-clip-padding text-transparent bg-opacity-50 text-white font-bold rounded-md hover:from-blue-700 hover:to-purple-600"
                        onClick={handleSubmit}
                      >
                        Submit
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default AnswerCard;
