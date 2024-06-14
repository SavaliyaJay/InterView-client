import { Button, Textarea } from "@material-tailwind/react";
import React, { useState, useEffect, useRef } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "regenerator-runtime/runtime";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { postAnswerThunkAction } from "@/redux/content/action";

const AnswerCard = ({ questions, keyProp }) => {
  const dispatch = useDispatch();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [answer, setAnswer] = useState("");
  const processedLengthRef = useRef(0);

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

  const handleSubmit = () => {
    if (answer.trim() === "") {
      toast.error("Please write your answer before submitting.");
      return;
    }
    const question_id = questions ? questions[0]?.q_id : null;
    dispatch(postAnswerThunkAction({ answer, question_id }));
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <>
        <div className="bg-white p-3 rounded-md">
          <b>Write your answer here:</b>
          <div className="mt-2">
            <Textarea
              color="blue-gray"
              label="Message"
              value={answer}
              onChange={handleManualChange}
            />
            <div className="flex justify-end items-center mt-3">
              <Button color="blue" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="bg-white p-3 rounded-md">
      <b>Write your answer here:</b>
      <div className="mt-2">
        <Textarea color="blue-gray" label="Message" value={answer} onChange={handleManualChange} />
        <div className="flex justify-between items-center mt-3">
          <Button
            id="listen-button"
            color="blue"
            className={`rounded-full p-3 transition-transform duration-300 ${isSpeaking ? "transform scale-125" : "transform scale-100"}`}
            onClick={isListening ? stopListening : startListening}
          >
            {isListening ? <i className="bi bi-mic-mute"></i> : <i className="bi bi-mic"></i>}
          </Button>
          <Button color="blue" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnswerCard;
