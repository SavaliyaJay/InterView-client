// components/VoiceToText.js
import { useEffect, useState } from "react";

export default function VoiceToText() {
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    const button = document.getElementById("click_to_record");
    const handleClick = () => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.interimResults = true;

      recognition.addEventListener("result", (e) => {
        const transcript = Array.from(e.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");

        setTranscript(transcript);
        console.log(transcript);
      });

      recognition.start();
    };

    button.addEventListener("click", handleClick);

    return () => {
      button.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-800">
      <div className="voice_to_text w-full max-w-lg text-center">
        <h1 className="text-white text-5xl mb-4">Voice to Text Converter</h1>
        <textarea
          id="convert_text"
          className="w-full h-48 p-4 text-lg border-0 rounded-lg mb-4"
          value={transcript}
          readOnly
        />
        <button
          id="click_to_record"
          className="px-6 py-3 bg-blue-500 text-white text-lg rounded-md"
        >
          Voice To Text
        </button>
      </div>
    </div>
  );
}
