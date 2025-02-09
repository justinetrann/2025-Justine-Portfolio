import { useState, useEffect, useRef } from "react";

function ColdCallBot() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const chatEndRef = useRef(null); // Reference for auto-scrolling

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

    // Update Chat History & Auto-scroll
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { user: "You", message: userInput },
      { user: "Bot", message: botResponse },
    ]);

    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Function to make the AI speak
  const speakResponse = (text) => {
    const utterance = new SpeechSynthesisUtterance(text); // Creates a speech object
    utterance.lang = "en-US";
    utterance.pitch = 1; // Normal pitch (range: 0 - 2)
    utterance.rate = 0.9; // Slightly slower for clarity (range: 0.1 - 10)
    utterance.volume = 1; // Full volume

      // Get list of voices
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.includes("Google US English") || 
        voice.name.includes("Microsoft") || 
        voice.name.includes("Daniel") // A good British voice option
      );

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      window.speechSynthesis.speak(utterance);
  };

  // Function to clear chat history
  const clearChat = () => {
    setChatHistory([]);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h3>Cold Call AI</h3>

      {/* Button Container */}
      <div className="button-container">
        <button onClick={startListening} disabled={listening} className="start-call-button">
          {listening ? "Listening..." : "Start Cold Call"}
        </button>
        <button onClick={clearChat} className="clear-chat-button">
          Clear Chat History
        </button>
      </div>

      {/* Transcript and Response */}
      <p><strong>You Said:</strong> {transcript}</p>
      <p><strong>AI Response:</strong> {response}</p>

      {/* Chat History Display */}
      <div className="chat-history-container">
        <h4>Chat History</h4>
        {chatHistory.length > 0 ? (
          chatHistory.map((chat, index) => (
            <p key={index} className="chat-message-history">
              <strong>{chat.user}:</strong> {chat.message}
            </p>
          ))
        ) : (
          <p>No chat history yet.</p>
        )}
        <div ref={chatEndRef} />
      </div>
    </div>
  );
}

export default ColdCallBot;