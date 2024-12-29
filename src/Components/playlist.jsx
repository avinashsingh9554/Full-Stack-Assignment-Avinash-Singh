import React, { useState } from "react";
import { fetchPlaylists } from "./YouTubeService";

const Playlist = ({ accessToken }) => {
  const [playlists, setPlaylists] = useState([]);
  const [videos, setVideos] = useState([]);

  const handleFetchPlaylists = async () => {
    try {
      const data = await fetchPlaylists(accessToken);
      setPlaylists(data);
    } catch (error) {
      console.error("Failed to fetch playlists.");
    }
  };

  const handlePlaylistClick = async (playlistId) => {
    // Fetch videos for the selected playlist (not implemented here)
    console.log("Fetching videos for playlist:", playlistId);
    setVideos([
      { id: "1", title: "Video 1" },
      { id: "2", title: "Video 2" },
    ]);
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <button onClick={handleFetchPlaylists}>Fetch Playlists</button>
        <ul>
          {playlists.map((playlist) => (
            <li key={playlist.id} onClick={() => handlePlaylistClick(playlist.id)}>
              <img src='Imag.webp' alt="Thumbnail" />
              <p>{playlist.snippet.title}</p>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ flex: 1 }}>
        <h3>Videos</h3>
        <ul>
          {videos.map((video) => (
            <li key={video.id}>{video.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Playlist;
