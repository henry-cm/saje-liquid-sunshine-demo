import { useEffect, useRef, useState } from "react";
import "../styling/Clip03.css";
import saje3 from "../../assets/saje_03.mp4";

function Clip03({ play, zIndex, onDone }) {
  const videoRef = useRef(null);
  const [showText, setShowText] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!play || !video) return;
    setVisible(true);
    setShowText(false);
    video.currentTime = 0;
    video.play();
    video.onended = () => {
      setShowText(true);
      if (onDone) {
        setTimeout(() => onDone(), 1000); // slight delay after overlay
      }
    };
    return () => {
      video.onended = null;
    };
  }, [play, onDone]);

  return (
    <div
      className="clip03-wrapper"
      style={{
        opacity: play ? 1 : 0,
        zIndex,
      }}
    >
      <video
        ref={videoRef}
        src={saje3}
        muted
        playsInline
        className="clip03-video"
      />
      <div className="clip03-text">
        <div className="clip03-left">
          <h1 className="clip03-title">Reminder</h1>
          <p className="clip03-description">
            Keep out of reach of children and pets.
            <br />
            <br />
            Monitor the behavior of your pet; if you sense distress or
            agitation, contact your veterinarian for more information.
            <br />
            <br />
            Store product in a cool, dry area away from direct heat, light and
            exposure to oxygen.
          </p>
        </div>
        <div className="clip03-right">
          <h1 className="clip03-title">How to Use</h1>
          <p className="clip03-description">
            Add 10–15 drops to your diffuser of choice.
            <br />
            <br />
            Less is more; start with the lowest suggested number of drops and
            add according to your preference.
            <br />
            <br />
            Not for topical application.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Clip03;
