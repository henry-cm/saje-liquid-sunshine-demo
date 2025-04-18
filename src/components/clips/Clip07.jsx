// src/components/Clip07.jsx
import { useEffect, useRef, useState } from "react";
import combineClip from "../../assets/saje_07.mp4";
import "../styling/Clip07.css";

function Clip07({ play, zIndex, onDone }) {
  const videoRef = useRef(null);
  const [fadeToBlack, setFadeToBlack] = useState(false);
  const [showCredits, setShowCredits] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!play || !video) return;

    setFadeToBlack(false);
    setShowCredits(false);
    setZoomed(false);

    video.currentTime = 0;
    video.loop = false;
    video.play();

    // pan into center on mobile
    const tZoom = setTimeout(() => setZoomed(true), 100);

    // fade to black 1s before end
    const onTimeUpdate = () => {
      if (video.duration && video.currentTime >= video.duration - 1) {
        setFadeToBlack(true);
        video.removeEventListener("timeupdate", onTimeUpdate);
      }
    };
    video.addEventListener("timeupdate", onTimeUpdate);

    // show credits when video ends
    const onEnded = () => setShowCredits(true);
    video.addEventListener("ended", onEnded);

    return () => {
      clearTimeout(tZoom);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
    };
  }, [play]);

  return (
    <div
      className={
        "clip-wrapper clip07-wrapper" +
        (zoomed ? " zoomed" : "") +
        (showCredits ? " centered" : "")
      }
      style={{ opacity: play ? 1 : 0, zIndex }}
    >
      <video
        ref={videoRef}
        src={combineClip}
        muted
        playsInline
        className="clip-video"
      />

      {fadeToBlack && <div className="black-fade" />}

      {showCredits && (
        <div className="credits">
          <h1>Credits</h1>
          <p className="credit-role">Designed and developedby Henry CM</p>
          <p className="credit-tools">
            Made with ZBrush, Substance Painter, Photoshop, Illustrator, Maya,
            Arnold, React, and Figma
          </p>
          <p className="credit-copy">
            © {new Date().getFullYear()} Henry CM for Saje Natural Wellness
          </p>
          <div className="credits-buttons">
            <button
              className="scene-button2"
              onClick={() => window.open("https://www.saje.com", "_blank")}
            >
              Visit Saje.com
            </button>
            <button
              className="scene-button2"
              onClick={() => onDone && onDone("home")}
            >
              Start Over
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Clip07;
