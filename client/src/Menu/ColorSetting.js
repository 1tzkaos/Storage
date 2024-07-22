import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";

function ColorSettings() {
  const [bgColor, setBgColor] = useState(() => {
    const savedColor = window.localStorage.getItem("bgColor");
    return savedColor ? JSON.parse(savedColor) : "#ffffff";
  });

  const [textColor, setTextColor] = useState(() => {
    const savedColor = window.localStorage.getItem("textColor");
    return savedColor ? JSON.parse(savedColor) : "#000000";
  });
  const [folderColor, setFolderColor] = useState(() => {
    const savedColor = window.localStorage.getItem("folderColor");
    return savedColor ? JSON.parse(savedColor) : "#000000";
  });

  useEffect(() => {
    window.localStorage.setItem("bgColor", JSON.stringify(bgColor));
    window.localStorage.setItem("textColor", JSON.stringify(textColor));
    window.localStorage.setItem("folderColor", JSON.stringify(folderColor));
    document.body.style.backgroundColor = bgColor;
    document.body.style.color = textColor;
    document.body.style.folderColor = folderColor;
  }, [bgColor, textColor]);

  return (
    <div style={{ padding: "1rem" }}>
      <TextField
        label="Background Color"
        type="color"
        value={bgColor}
        onChange={(event) => setBgColor(event.target.value)}
        style={{ width: "5rem", height: "5rem" }}
      />
      <TextField
        label="Text Color"
        type="color"
        value={textColor}
        onChange={(event) => setTextColor(event.target.value)}
        style={{ width: "5rem", height: "5rem" }}
      />
      <TextField
        label="Folder Color"
        type="color"
        value={folderColor}
        onChange={(event) => setFolderColor(event.target.value)}
        style={{ width: "5rem", height: "5rem" }}
      />
    </div>
  );
}

export default ColorSettings;
