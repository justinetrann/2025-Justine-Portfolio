import { useState } from "react";
import './App.css';
import { FaHeart } from "react-icons/fa";

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
            <li>HOME</li>
            <li>ABOUT</li>
            <li>PROJECT</li>
            <li>RESEARCH</li>
            <li>EXPERIENCE</li>
            <li>MORE</li>
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
        {/* Playlist Container */}
        <div className="playlist">
          <h3>My Playlist</h3>
          <ul>
            <li>🎵 Song 1 - Artist 1</li>
            <li>🎵 Song 2 - Artist 2</li>
            <li>🎵 Song 3 - Artist 3</li>
            <li>🎵 Song 4 - Artist 4</li>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
