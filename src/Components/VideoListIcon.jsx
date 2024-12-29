import React from "react";

const VideoListIcon = ({ videos }) => {
  return (
    <div style={{ position: "relative" }}>
      <button>Video List</button>
      {videos.length > 5 && (
        <div style={{ position: "absolute", top: "100%", left: "0", background: "white", padding: "10px" }}>
          <ul>
            {videos.slice(0, 5).map((video) => (
              <li key={video.id}>{video.title}</li>
            ))}
            <li>...and more</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default VideoListIcon;
