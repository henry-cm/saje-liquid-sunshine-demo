// Clip06_MotherHub.jsx
import { useEffect, useRef, useState } from "react";
import saje06 from "../../assets/saje_06.mp4";

import "../styling/Clip06_MotherHub.css";

function Clip06_MotherHub({ play, zIndex, onDone }) {
  const videoRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!play || !video) return;

    setVisible(true);
    video.currentTime = 0;
    video.loop = true;
    video.play();

    return () => {
      video.loop = false;
    };
  }, [play]);

  const handleClick = (destination) => {
    if (onDone) onDone(destination);
  };

  return (
    <div
      className="clip-wrapper clip06-wrapper"
      style={{
        opacity: play ? 1 : 0,
        zIndex,
      }}
    >
      <video
        ref={videoRef}
        src={saje06}
        muted
        playsInline
        className="clip-video"
      />

      {visible && (
        <div className="button-container2">
          <button
            className="scene-button"
            onClick={() => handleClick("grapefruit")}
          >
            Grapefruit
          </button>
          <button className="scene-button" onClick={() => handleClick("lime")}>
            Lime
          </button>
          <button
            className="scene-button"
            onClick={() => handleClick("bergamot")}
          >
            Bergamot
          </button>
          <button
            className="scene-button"
            onClick={() => handleClick("combine")}
          >
            Complete the Blend
          </button>
          <button className="scene-button" onClick={() => handleClick("home")}>
            Home
          </button>
        </div>
      )}
    </div>
  );
}

export default Clip06_MotherHub;
