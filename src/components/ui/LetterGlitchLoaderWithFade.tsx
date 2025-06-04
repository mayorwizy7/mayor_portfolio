import React, { useState, useEffect } from "react";
import LetterGlitch from "./LetterGlitch";

interface LetterGlitchLoaderWithFadeProps {
  glitchColors?: string[];
  glitchSpeed?: number;
  smooth?: boolean;
  loading: boolean;
  fadeDuration?: number; // in milliseconds
}

const LetterGlitchLoaderWithFade: React.FC<LetterGlitchLoaderWithFadeProps> = ({
  glitchColors = ["#2b4539", "#61dca3", "#61b3dc"],
  glitchSpeed = 10,
  smooth = true,
  loading,
  fadeDuration = 1000,
}) => {
  const [visible, setVisible] = useState(loading);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (loading) {
      setVisible(true);
      setFadeOut(false);
    } else {
      setFadeOut(true);
      const timeout = setTimeout(() => {
        setVisible(false);
      }, fadeDuration);
      return () => clearTimeout(timeout);
    }
  }, [loading, fadeDuration]);

  if (!visible) return null;

  const containerStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "#000000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    zIndex: 9999,
    flexDirection: "column",
    opacity: fadeOut ? 0 : 1,
    transition: `opacity ${fadeDuration}ms ease`,
    pointerEvents: fadeOut ? "none" : "auto",
  };

  const textStyle: React.CSSProperties = {
    position: "absolute",
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: "3rem",
    userSelect: "none",
    pointerEvents: "none",
  };

  return (
    <div style={containerStyle}>
      <LetterGlitch
        glitchColors={glitchColors}
        glitchSpeed={glitchSpeed}
        smooth={smooth}
        centerVignette={true}
        outerVignette={false}
      />
      <div style={textStyle}>Loading...</div>
    </div>
  );
};

export default LetterGlitchLoaderWithFade;
