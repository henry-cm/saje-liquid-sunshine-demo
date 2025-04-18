import { useEffect, useRef, useState } from "react";
import zoomIn from "../../assets/saje_06_lime_01.mp4";
import zoomOut from "../../assets/saje_06_lime_02.mp4";
import "../styling/Clip06_MotherHub.css"; // base video, buttons, lock-to-82.5%
import "../styling/Clip06_Lime.css"; // below

function Clip06_Lime({ play, zIndex, onDone }) {
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

    // start zoom a hair after playback begins
    const t = setTimeout(() => setZoomed(true), 100);
    return () => {
      v.onended = null;
      clearTimeout(t);
    };
  }, [play]);

  // Handle back → "out" clip, no zoom
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
      className={`clip-wrapper clip06-wrapper lime-${stage}${
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
        <div className="fruit-text1">
          <h1>Lime</h1>
          <p>
            Crisp and refreshing, lime cuts through mental fog to boost focus,
            clarity, and alertness.
            <br />
            <br />
            Its clean aroma brings a sense of lightness, helping you feel sharp
            and recharged.
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

export default Clip06_Lime;
