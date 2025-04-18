// Clip04.jsx
import { useEffect, useRef, useState } from "react";
import "../styling/Clip04.css";
import saje4 from "../../assets/saje_04.mp4";

function Clip04({ play, zIndex, onDone }) {
  const videoRef = useRef(null);
  const [showButton, setShowButton] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!play || !video) return;

    setVisible(true);
    setShowButton(false);

    video.currentTime = 0;
    video.play();

    video.onended = () => {
      setShowButton(true); // show button AFTER video
    };

    return () => {
      video.onended = null;
    };
  }, [play]);

  const handleClick = () => {
    if (onDone) onDone(); // triggers step 4
  };

  return (
    <div
      className="clip-wrapper clip04-wrapper"
      style={{
        opacity: play ? 1 : 0,
        zIndex,
      }}
    >
      <video
        ref={videoRef}
        src={saje4}
        preload="auto"
        muted
        playsInline
        className="clip-video"
      />
      {showButton && (
        <button className="next-button1" onClick={handleClick}>
          Enter Ingredient World
        </button>
      )}
    </div>
  );
}

export default Clip04;
