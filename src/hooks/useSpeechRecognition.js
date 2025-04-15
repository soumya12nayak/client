import { useEffect, useState } from "react";

const useSpeechRecognition = () => {
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);

  let recognition;

  if ('webkitSpeechRecognition' in window) {
    recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      setTranscript(event.results[0][0].transcript);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  }

  const startListening = () => {
    if (recognition) {
      setTranscript("");
      recognition.start();
      setListening(true);
    }
  };

  const stopListening = () => {
    if (recognition) recognition.stop();
  };

  return { transcript, listening, startListening, stopListening };
};

export default useSpeechRecognition;
