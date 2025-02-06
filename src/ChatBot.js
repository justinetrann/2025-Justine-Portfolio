import { useState } from "react";

function ChatBot() {
   const [messages, setMessages] = useState([
      { sender: "Justine", text: "Hi! I'm Justine. Ask me about my resume, experience, projects, or research! Type 'help' if you’re not sure what to ask." },
    ]);
    const [input, setInput] = useState("");

    const knowledgeBase = [
      // General
      { keywords: ["hello", "hi", "hey"], response: "Hey there! How can I help you today?" },
      { keywords: ["who are you", "your name", "tell me about yourself", "introduce yourself"], response: "I'm Justine! I'm a software developer passionate about web development, research, and building impactful projects!" },
      { keywords: ["help"], response: "You can ask about:\n- Resume (e.g. 'Tell me about your resume')\n- Experience (e.g. 'Where have you worked?')\n- Projects (e.g. 'What projects have you built?')\n- Research (e.g. 'What have you researched?')\n- Skills (e.g. 'What programming languages do you know?')\n- Fun (e.g. 'What do you like to do for fun?') Hint: Ask about my career goals, freelance, remote work, hobbies, five years, and teamwork!" },

      // Experience
      { keywords: ["experience", "work", "job"], response: "I have experience as a Full Stack Developer Intern at Christian Brother Automotive and as a Web Developer for Killeen Vietnamese Community." },
      { keywords: ["christian brother", "christian brother automotive", "tell me about christian brother"], response: "At Christian Brother Automotive, I worked as a Full Stack Developer Intern. I built a payroll import feature using React and SQL, automated Python scripts for franchise news, and developed tools to enhance workflow efficiency. And More!" },
      { keywords: ["what did you do at christian brother"], response: "I designed a payroll import system, optimized SQL queries for QuickBooks, and built a vehicle tracking system to improve customer service transparency." },
      { keywords: ["killeen vietnamese community", "tell me about killeen"], response: "I built a website for the Killeen Vietnamese Community to help members connect. It included a CMS so non-technical admins could easily update content without needing a developer." },

      // Resume & Education
      { keywords: ["resume", "cv"], response: "You can check out my resume by clicking the RESUME tab on the left!" },
      { keywords: ["education", "degree", "university", "school"], response: "I studied Computer Science at the University of Houston and graduated in December 2023 with a concentration in Software Design. I also dabbled in research with Real-Time Systems Laboratory!" },
      { keywords: ["certifications"], response: "I'm Microsoft Certified: Azure Fundamentals! I'm also working towards AWS certifications to deepen my cloud knowledge." },

      // Skills & Technologies
      { keywords: ["skills", "expertise", "languages"], response: "I'm skilled in JavaScript (React, Redux), Python (Flask), C#, C/C++, SQL, Node.js, and cloud platforms like Azure and AWS." },
      { keywords: ["database"], response: "I've worked with MySQL and Microsoft SQL Server!" },
      { keywords: ["git", "github"], response: "Yes, I use Git for version control, and my projects are on GitHub!" },

      // Projects
      { keywords: ["projects", "portfolio"], response: "I've worked on projects like a Project Management System, a Fuel Rate Prediction Software, and Fitstagram, an Instagram-like Android app." },
      { keywords: ["personal website"], response: "Yes! If you are typing in this chatbot you are at the right place!" },
      { keywords: ["most impactful"], response: "Helping the Killeen Vietnamese Community establish a website was one of my most rewarding projects. It created a space where people could connect, and I designed it so non-technical admins could manage content easily!" },

      // Research
      { keywords: ["research", "wcet", "branch prediction"], response: "I researched Hybrid Branch Prediction for WCET Analysis, improving prediction accuracy by up to 32.4%. It was a fascinating challenge!" },

      // Contact
      { keywords: ["contact", "email", "linkedin"], response: "You can reach me via LinkedIn (linkedin.com/in/justine-tran) or email at justinetran.091@outlook.com!" },
      { keywords: ["github profile"], response: "Yes! Check out my GitHub: https://github.com/justinetrann" },


      // Career & Fun
      { keywords: ["career goals"], response: "I want to continue growing as a full-stack developer and work on impactful projects. In the future, I'd love to be at a company that values innovation and collaboration!" },
      { keywords: ["freelance"], response: "Yes! I'm open to freelance work in web development and software engineering." },
      { keywords: ["remote work"], response: "I enjoy remote work, but I also like collaborating with a team in an office!" },
      { keywords: ["hobbies"], response: "I love reading! I often read self-help books to learn new perspectives. Recently, I read 'How to Listen with Intention' by Patrick King, and it completely changed how I approach conversations!" },
      { keywords: ["five years"], response: "In five years, I want to be known as someone who's truly skilled at what they do. Not just for recognition, but because mastery makes work more exciting and fulfilling!" },
      { keywords: ["teamwork"], response: "I thrive in team environments! I believe the best ideas come from collaboration, and I enjoy fostering a sense of community wherever I go." }
    ];

    const getBotResponse = (message) => {
      message = message.toLowerCase();
  
      // Find a matching response
      for (const entry of knowledgeBase) {
        if (entry.keywords.some(keyword => message.includes(keyword))) {
          return entry.response;
        }
      }
  
      return "I'm not sure about that. Try asking about my resume, experience, projects, or research!";
    };

    const handleSendMessage = () => {
      if (input.trim()) {
        const userMessage = { sender: "user", text: input };
        const botMessage = { sender: "Justine", text: getBotResponse(input) };
        setMessages([...messages, userMessage, botMessage]);
        setInput("");
      }
    };

    return (
      <div className="chatbot-container">
        <div className="chatbot-header">Chat with Me!</div>
        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              <strong>{msg.sender === "user" ? "You" : "Me"}:</strong> {msg.text}
            </div>
          ))}
        </div>
        <div className="chatbot-input">
          <input
            type="text"
            placeholder="Ask me something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    );
}

export default ChatBot;