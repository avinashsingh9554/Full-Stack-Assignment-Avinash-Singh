import React, { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios";
import "./App.css";

const API_BASE_URL = "http://localhost:5000/api";

const PlaylistCard = ({ playlist, index, moveCard, onClick }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "card",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: "card",
    hover: (item) => {
      if (item.index !== index) {
        moveCard(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => dragRef(dropRef(node))}
      className="playlist-card"
      style={{
        opacity: isDragging ? 0.5 : 1,
        boxShadow: isDragging ? "0px 4px 10px rgba(0, 0, 0, 0.2)" : "none",
        transform: isDragging ? "scale(1.05)" : "none",
      }}
      onClick={onClick}
    >
      <img src={playlist.thumbnail} alt={playlist.name} />
      <div className="playlist-info">
        <p>{playlist.name}</p>
        <span>{playlist.videos} Videos</span>
      </div>
    </div>
  );
};

const App = () => {
  const [playlists, setPlaylists] = useState([]);
  const [currentVideos, setCurrentVideos] = useState([]);
  const [showLogin, setShowLogin] = useState(true);
  const [email, setEmail] = useState("");

  const defaultPlaylists = [
    { id: 1, name: "Playlist 1", videos: 5, thumbnail: "https://via.placeholder.com/150", videoList: ["Video 1", "Video 2", "Video 3", "Video 4", "Video 5"] },
    { id: 2, name: "Playlist 2", videos: 7, thumbnail: "https://via.placeholder.com/150", videoList: ["Video 1", "Video 2", "Video 3", "Video 4", "Video 5", "Video 6", "Video 7"] },
    { id: 3, name: "Playlist 3", videos: 10, thumbnail: "https://via.placeholder.com/150", videoList: ["Video 1", "Video 2", "Video 3", "Video 4", "Video 5", "Video 6", "Video 7", "Video 8", "Video 9", "Video 10"] },
  ];

  const moveCard = (fromIndex, toIndex) => {
    const updatedPlaylists = [...playlists];
    const [movedCard] = updatedPlaylists.splice(fromIndex, 1);
    updatedPlaylists.splice(toIndex, 0, movedCard);
    setPlaylists(updatedPlaylists);
  };

  const handlePlaylistClick = (playlist) => {
    setCurrentVideos(playlist.videoList);
  };

  const saveLayout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/save-layout`, { playlists });
      alert("Layout saved successfully!");
    } catch (error) {
      console.error("Error saving layout:", error);
      alert("Failed to save layout.");
    }
  };

  const loadLayout = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/load-layout`);
      if (data && data.playlists) {
        setPlaylists(data.playlists);
      } else {
        setPlaylists(defaultPlaylists);
      }
    } catch (error) {
      console.error("Error loading layout:", error);
      alert("Failed to load layout. Loading default playlists.");
      setPlaylists(defaultPlaylists);
    }
  };

  const handleLogin = () => {
    if (email) {
      setShowLogin(false);
      loadLayout();
    }
  };

  useEffect(() => {
    if (!showLogin) {
      loadLayout();
    }
  }, [showLogin]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app-container">
        {showLogin ? (
          <div className="login-page">
            <h2>Login via OTP</h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
          </div>
        ) : (
          <>
            <div className="sidebar">
              <h3>bleash</h3>
              <ul>
                <li>Revenue</li>
                <li>Shoppable Video</li>
                <li>Story</li>
                <li>Live Commerce</li>
                <li className="active">Playlist Manager</li>
                <li>One Click Post</li>
                <li>Calendar</li>
                <li>Hire Influencer</li>
              </ul>
            </div>

            <div className="main-content">
              <div className="header">
                <h2>Design Studio</h2>
                <div className="header-buttons">
                  <button>Support Request</button>
                  <button>Product Tour</button>
                  <button>Import From YouTube</button>
                </div>
              </div>

              <div className="playlist-section">
                <h3>YouTube Playlists</h3>
                <div className="playlists-grid">
                  {playlists.map((playlist, index) => (
                    <PlaylistCard
                      key={playlist.id}
                      playlist={playlist}
                      index={index}
                      moveCard={moveCard}
                      onClick={() => handlePlaylistClick(playlist)}
                    />
                  ))}
                </div>
              </div>

              <div className="layout-buttons">
                <button onClick={saveLayout}>Save Layout</button>
                <button onClick={loadLayout}>Load Layout</button>
              </div>

              <div className="update-panel">
                <h4>Video List</h4>
                <div className="video-list">
                  {currentVideos.length > 0 ? (
                    currentVideos.map((video, index) => (
                      <div className="video-item" key={index}>
                        <p>{video}</p>
                      </div>
                    ))
                  ) : (
                    <p>No videos selected</p>
                  )}
                </div>
                <button className="update-button">Update Playlist</button>
              </div>
            </div>
          </>
        )}
      </div>
    </DndProvider>
  );
};

export default App;
