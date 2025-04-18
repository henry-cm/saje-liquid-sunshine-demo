// Clip05.jsx
import { useEffect, useRef, useState } from "react";
import "../styling/Clip05.css";
import saje5 from "../../assets/saje_05.mp4";

function Clip05({ play, zIndex, onDone }) {
  const videoRef = useRef(null);
  const [showFade, setShowFade] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!play || !video) return;

    setVisible(true);
    setShowFade(false);

    video.currentTime = 0;
    video.loop = false;
    video.play();

    let hasFaded = false;

    const handleTimeUpdate = () => {
      if (
        video.duration &&
        video.currentTime >= video.duration - 1 &&
        !hasFaded
      ) {
        setShowFade(true);
        hasFaded = true;
      }
    };

    const handleEnded = () => {
      setTimeout(() => {
        setShowFade(false);
        if (onDone) onDone();
      }, 300);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, [play, onDone]);

  return (
    <div
      className="clip-wrapper clip05-wrapper"
      style={{
        opacity: play ? 1 : 0,
        zIndex,
      }}
    >
      <video
        ref={videoRef}
        src={saje5}
        preload="auto"
        muted
        playsInline
        className="clip-video"
      />

      {play && <div className={`white-fade ${showFade ? "active" : ""}`} />}
    </div>
  );
}

export default Clip05;
