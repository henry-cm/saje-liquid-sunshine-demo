import { useEffect, useRef, useState } from "react";
import "../styling/Clip01.css";
import saje1 from "../../assets/saje_01.mp4";

function Clip01({ play, zIndex, onDone }) {
  const videoRef = useRef(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!play || !video) return;

    setShowButton(false);
    video.currentTime = 0;
    video.play();

    video.onended = () => {
      setShowButton(true); // show button AFTER video ends
    };

    return () => {
      video.onended = null;
    };
  }, [play]);

  const handleStart = () => {
    if (onDone) onDone(); // continue to next step
  };

  const handleSkipToIngredients = () => {
    if (onDone) onDone("ingredients");
  };

  return (
    <div
      className="clip-wrapper"
      style={{
        opacity: play ? 1 : 0,
        zIndex,
      }}
    >
      <video
        ref={videoRef}
        src={saje1}
        muted
        playsInline
        className="clip-video"
      />
      <div className="button-container1">
        {showButton && (
          <button className="enter-button" onClick={handleStart}>
            Begin the Experience
          </button>
        )}
        {showButton && (
          <button
            className="ingrediients-button"
            onClick={handleSkipToIngredients}
          >
            Skip to Ingredients
          </button>
        )}
        {showButton && (
          <button
            className="redirect-button"
            onClick={() =>
              window.open(
                "https://www.saje.com/products/liquid-sunshine-cheerful-diffuser-blend-34-fl-oz?_gl=1*1ttw98w*_gcl_au*MjA1MDA2NTEzNS4xNzQ0MjE2NDQ0*_ga*MjAyMjYyNDQ4NC4xNzQ0MjE2NDQ0*_ga_WLLKTBE7TW*MTc0NDIxNjQ0NC4xLjEuMTc0NDIxNzc1My4zOC4wLjk0NjkwMjU1Ng..&variant=45051463270697",
                "_blank"
              )
            }
          >
            Visit saje.com
          </button>
        )}
      </div>
      <p className="clip1-text">
        Welcome to a cinematic scroll experience—full‑screen scenes play at key
        moments, and you’ll only move forward when prompted by the pulsing
        bubble in the top‑right corner. Use your scroll wheel or trackpad to
        advance, or click on‑screen buttons when they appear.
        <br />
        Best viewed on desktop with Chrome browser.
      </p>
    </div>
  );
}

export default Clip01;
