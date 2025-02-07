import { useState, useEffect } from "react";

function ColdCallBot() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }
  }, []);

  const startListening = () => {
    // Create new speech recognition instance
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = false; // Stops listening after one sentance
    recognition.lang = "en-US";

    // Bot starts listening
    recognition.onstart = () => {
      setListening(true); // Active listening
      setTranscript(""); // Clears previous transcript
      setResponse(""); // Clear previous AI response
    };

    // When speech is detected and coverted to text
    recognition.onresult = (event) => {
      const userSpeech = event.results[0][0].transcript; // Extract user's speech
      setTranscript(userSpeech); // Stores what the user said
      handleResponse(userSpeech); // Call function to generate AI Response
    };

    // Handles errors during speech recoginiton
    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setListening(false);
    };

    // When speech recognition stops (either user is done talking or an error occurred)
    recognition.onend = () => {
      setListening(false); // Updates state to show that the bot stopped listening
    };

    recognition.start();
  };

  // Function to generate an AI response based on the user's input
  const handleResponse = (userInput) => {
    let botResponse = ""; // Stores the AI's response

    // Checks for specific keywords or phrases
    if (userInput.toLowerCase().includes("make me an offer i can't refuse")) {
      botResponse = "Absolutely! How about a deal that saves you 30% today?";
    } else if (userInput.toLowerCase().includes("not interested")) {
      botResponse = "I totally understand. Just out of curiosity, what would make you consider it?";
    } else {
      botResponse = "That’s interesting! Let me tell you more about our offer.";
    }

    setResponse(botResponse); // Updates state with AI response
    speakResponse(botResponse); // Makes the AI speak out the response
  };

  // Function to make the AI speak
  const speakResponse = (text) => {
    const utterance = new SpeechSynthesisUtterance(text); // Creates a speech object
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance); // Uses browser's Text-to-Speech to speak
  };

  return (
    <div>
      <h3>Cold Call AI</h3>
      <button onClick={startListening} disabled={listening}>
        {listening ? "Listening..." : "Start Cold Call"}
      </button>
      <p><strong>You Said:</strong> {transcript}</p>
      <p><strong>AI Response:</strong> {response}</p>
    </div>
  );
}

export default ColdCallBot;