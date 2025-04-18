// src/components/Clip06_Bergamot.jsx
import { useEffect, useRef, useState } from "react";
import zoomIn from "../../assets/saje_06_bergamot_01.mp4";
import zoomOut from "../../assets/saje_06_bergamot_02.mp4";

import "../styling/Clip06_MotherHub.css"; // base video, transitions & buttons
import "../styling/Clip06_Bergamot.css"; // bergamot‑specific overrides

function Clip06_Bergamot({ play, zIndex, onDone }) {
  const [stage, setStage] = useState("in"); // "in" or "out"
  const [showText, setShowText] = useState(false);
  const [showBack, setShowBack] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const videoRef = useRef(null);

  // Play "in" clip and trigger zoom
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

    const t = setTimeout(() => setZoomed(true), 100);
    return () => {
      v.onended = null;
      clearTimeout(t);
    };
  }, [play]);

  // Back button triggers "out" clip
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
      className={`clip-wrapper clip06-wrapper bergamot-${stage}${
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
        <div className="fruit-text bergamot-text">
          <h1>Bergamot</h1>
          <p>
            Soft, floral citrus with calming depth — bergamot brings balance,
            serenity, and subtle warmth to the blend.
            <br />
            <br />
            It grounds the brighter notes, offering a gentle pause in your day.
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

export default Clip06_Bergamot;
