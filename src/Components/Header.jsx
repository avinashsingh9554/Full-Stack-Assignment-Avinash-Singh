import React from "react";

const Header = ({ onImportClick }) => {
  return (
    <header style={{ padding: "10px", display: "flex", justifyContent: "space-between" }}>
      <h1>My Application</h1>
      <button onClick={onImportClick}>Import From YouTube</button>
    </header>
  );
};

export default Header;
