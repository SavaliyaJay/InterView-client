import { Button, Textarea } from "@material-tailwind/react";
import React, { useState, useEffect, useRef } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "regenerator-runtime/runtime";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const AnswerCard = ({ answer, keyProp }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [story, setStory] = useState("");
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
      setStory((prevStory) => `${prevStory}${newTranscript}`.trim());
      processedLengthRef.current = transcript.length;

      const timeoutId = setTimeout(() => {
        setIsSpeaking(false);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [transcript]);

  const handleManualChange = (event) => {
    setStory(event.target.value);
  };

  useEffect(() => {
    setStory("");
    processedLengthRef.current = 0;
    resetTranscript();
  }, [keyProp, resetTranscript]);

  if (!browserSupportsSpeechRecognition) {
    return (
      <>
        <div className="bg-white p-3 rounded-md">
          <b>Write your answer here:</b>
          <div className="mt-2">
            <Textarea
              color="blue-gray"
              label="Message"
              value={story}
              onChange={handleManualChange}
            />
            <div className="flex justify-end items-center mt-3">
              <Button color="blue">Submit</Button>
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
        <Textarea color="blue-gray" label="Message" value={story} onChange={handleManualChange} />
        <div className="flex justify-between items-center mt-3">
          <Button
            id="listen-button"
            color="blue"
            className={`rounded-full p-3 transition-transform duration-300 ${isSpeaking ? "transform scale-125" : "transform scale-100"}`}
            onClick={isListening ? stopListening : startListening}
          >
            {isListening ? <i className="bi bi-mic-mute"></i> : <i className="bi bi-mic"></i>}
          </Button>
          <Button color="blue">Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default AnswerCard;
