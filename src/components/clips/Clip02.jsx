import { useEffect, useRef } from "react";
import "../styling/Clip02.css";
import saje2 from "../../assets/saje_02.mp4";

function Clip02({ play, zIndex, onDone }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!play || !video) return;

    video.currentTime = 0;
    video.play();

    video.onended = () => {
      // wait 1 second after video ends, then unlock scroll
      if (onDone) {
        setTimeout(() => onDone(), 1000);
      }
    };

    return () => {
      video.onended = null;
    };
  }, [play, onDone]);

  return (
    <div
      className="clip02-wrapper"
      style={{
        opacity: play ? 1 : 0,
        zIndex,
      }}
    >
      <video
        ref={videoRef}
        src={saje2}
        preload="auto"
        muted
        playsInline
        className="clip02-video"
      />
      <div className="clip2-text">
        <h1 className="clip2-title">A Burst of Citrus Bliss</h1>
        <p className="clip2-description">
          A fan-favorite blend of sweet, zesty and fresh citruses.
          <br />
          <br />
          We formulated this well-loved blend to help brighten the mood, uplift
          your day and encourage feelings of happiness and positivity, no matter
          where you choose to diffuse it.
          <br />
          <br />
          Blended without synthetics or artificial fragrances to scent your
          home, naturally.
        </p>
      </div>
    </div>
  );
}

export default Clip02;
