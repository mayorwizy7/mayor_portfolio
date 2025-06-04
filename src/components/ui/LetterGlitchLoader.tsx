import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import LetterGlitch from "./LetterGlitch";

interface LetterGlitchLoaderProps {
  glitchColors?: string[];
  glitchSpeed?: number;
  smooth?: boolean;
  isVisible?: boolean;
}

const LetterGlitchLoader: React.FC<LetterGlitchLoaderProps> = ({
  glitchColors = ["#2b4539", "#61dca3", "#61b3dc"],
  glitchSpeed = 10,
  smooth = true,
  isVisible = true,
}) => {
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
    <AnimatePresence>
      {isVisible && (
        <motion.div
          style={containerStyle}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <LetterGlitch
            glitchColors={glitchColors}
            glitchSpeed={glitchSpeed}
            smooth={smooth}
            centerVignette={true}
            outerVignette={false}
          />
          <div style={textStyle}>Loading...</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LetterGlitchLoader;
