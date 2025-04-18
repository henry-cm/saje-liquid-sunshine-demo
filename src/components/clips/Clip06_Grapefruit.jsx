// src/components/Clip06_Grapefruit.jsx
import { useEffect, useRef, useState } from "react";
import zoomIn from "../../assets/saje_06_grapefruit_01.mp4";
import zoomOut from "../../assets/saje_06_grapefruit_02.mp4";

import "../styling/Clip06_MotherHub.css"; // base video, buttons, 85.2% lock
import "../styling/Clip06_Grapefruit.css"; // grapefruit‑specific overrides

function Clip06_Grapefruit({ play, zIndex, onDone }) {
  const [stage, setStage] = useState("in"); // "in" or "out"
  const [showText, setShowText] = useState(false);
  const [showBack, setShowBack] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const videoRef = useRef(null);

  // Play "in" clip and trigger zoom‑in
  useEffect(() => {
    if (!play) return;
    const v = videoRef.current;
    setStage("in");
    setShowText(false);
    setShowBack(false);
    setZoomed(false);

    v.currentTime = 0;
    v.loop = false;
    v.play();
    v.onended = () => {
      setShowText(true);
      setTimeout(() => setShowBack(true), 1000);
    };

    // kick off zoom one frame later
    const t = setTimeout(() => setZoomed(true), 100);
    return () => {
      v.onended = null;
      clearTimeout(t);
    };
  }, [play]);

  // Back button switches to "out" clip
  const handleBack = () => {
    setShowText(false);
    setShowBack(false);
    setStage("out");
    setZoomed(false);
  };

  // Play "out" clip
  useEffect(() => {
    if (!play || stage !== "out") return;
    const v = videoRef.current;
    v.currentTime = 0;
    v.loop = false;
    v.play();
    v.onended = () => onDone && onDone("ingredients");
    return () => {
      v.onended = null;
    };
  }, [stage, play, onDone]);

  return (
    <div
      className={`clip-wrapper clip06-wrapper grapefruit-${stage}${
        zoomed ? " zoomed" : ""
      }`}
      style={{ opacity: play ? 1 : 0, zIndex }}
    >
      <video
        ref={videoRef}
        src={stage === "in" ? zoomIn : zoomOut}
        preload="auto"
        muted
        playsInline
        className="clip-video"
      />

      {showText && (
        <div className="fruit-text">
          <h1>Grapefruit</h1>
          <p>
            Bright and citrusy, grapefruit awakens your senses and encourages a
            clear, energized state of mind.
            <br />
            <br />
            It adds a touch of zest to the blend, creating a feeling of renewal
            and focus.
          </p>
        </div>
      )}

      {showBack && (
        <button className="back-button" onClick={handleBack}>
          Back to Ingredients
        </button>
      )}
    </div>
  );
}

export default Clip06_Grapefruit;
