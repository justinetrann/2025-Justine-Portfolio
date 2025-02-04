import { useState } from "react";
import './App.css';
import { FaHeart } from "react-icons/fa";

function FloatingWindow({ title, onClose }) {
  const isResume = title === "RESUME";
  const isAbout = title === "ABOUT";
  const aboutMessage = `
  Right now, my nav bar is filled with placeholders, but I want to replace them with projects that truly excite me! 
  Not just old school assignments from my resume, but creative, spontaneous ideas that spark my curiosity.

  My latest fun idea? A chatbot—one where you can chat with me (or a virtual version of me) and ask me about my current experience!

  This website may be simple for now, but my goal is to fill it with my passion for coding and bring my ideas to life. Stay tuned!
  `;

  return (
    <div className={`floating-window ${isResume ? "large-window" : ""} ${isAbout ? "about-window" : ""}`}>
      <div className="floating-header">
        <span className="fake-link">https://{title.toLowerCase()}.com</span>
        <button className="close-button" onClick={onClose}>X</button>
      </div>
      <div className="floating-content">
        {isResume ? (
          <iframe
            src={`${process.env.PUBLIC_URL}/Tran_Justine_2025.pdf`}
            width="100%"
            height="100%"
            style={{ border: "none" }}
            title="Resume"
          ></iframe>
        ) : title === "ABOUT" ? (
          <p className="about-text">{aboutMessage}</p>
        ) : (
          <>
            <h3>{title} Page</h3>
            <p>This is a webpage for {title}. Content still in the works!</p>
          </>
        )}
      </div>
    </div>
  );
}

function App() {
  const [likes, setLikes] = useState(100156);
  const [comments, setComments] = useState([
    { username: "Alice", text: "Great portfolio!" },
    { username: "Bob", text: "Nice work, keep it up!" },
    { username: "Charlie", text: "This looks amazing!" }
  ]);
  const [newComment, setNewComment] = useState("");
  const [username, setUsername] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [floatingWindow, setFloatingWindow] = useState(null);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (username.trim() && newComment.trim()) {
      setComments(prevComments => [...prevComments, { username, text: newComment }]);
      setNewComment("");
      setUsername("");
      setShowForm(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="top-container">
          <h1 className="title">Justine Tran</h1>
          <h2 className="subtitle">Portfolio</h2>
          <button className="chat-button">Chat Bot</button>
        </div>
          <nav className="side-nav">
          <ul>
            {["RESUME", "ABOUT", "PROJECT", "RESEARCH", "EXPERIENCE", "MORE"].map((item) => (
              <li key={item} onClick={() => setFloatingWindow(item)}>{item}</li>
            ))}
          </ul>
        </nav>
        <div className="post">
          <div className="top-section">
            <img src="/cover.jpg" alt="Top Section" className="top-section-image" />
          </div>
          <div className="bottom-section">           
            {/* Like & Comment Counts */}
            <div className="post-actions">
              <div className="like-section" onClick={handleLike}>
                <FaHeart className="heart-icon" />
                <span className="like-count">{likes}</span>
              </div>
              <div className="comment-count-section">
                <span>{comments.length} Comments</span>
              </div>
            </div>
            {/* Comment Section */}
            <div className="comment-container">
              {/* Display Comments First */}
              <div className="comment-list">
                {comments.length > 0 ? (
                  comments.map((comment, index) => (
                    <div key={index} className="comment">
                      <strong>{comment.username}:</strong> {comment.text}
                    </div>
                  ))
                ) : (
                  <p className="no-comments">No comments yet.</p>
                )}
              </div>
              {/* Add Comment Button Below Comments */}
              <button className="add-comment-button" onClick={() => setShowForm(!showForm)}>
                ...add comment
              </button>
              {/* Comment Form (Appears When Button is Clicked) */}
              {showForm && (
                <form className="comment-form" onSubmit={handleCommentSubmit}>
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <textarea
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                  />
                  <button type="submit">Post</button>
                </form>
              )}
            </div>
          </div>
        </div> {/* End of post */}
        {/* ChatBot Container */}
        <div className="chatbot">
        </div>
        {/* Playlist Container */}
        <div className="playlist">
          <iframe
            title="Spotify Playlist"
            style={{ borderRadius: "12px" }}
            src="https://open.spotify.com/embed/playlist/4ZbMjdW3G7JDllorPIC4lm?utm_source=generator"
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
        {floatingWindow && <FloatingWindow title={floatingWindow} onClose={() => setFloatingWindow(null)} />}
      </header>
    </div>
  );
}

export default App;
