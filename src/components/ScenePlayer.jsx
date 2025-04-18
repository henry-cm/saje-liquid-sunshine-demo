// src/components/ScenePlayer.jsx
import { useEffect, useState } from "react";
import Clip01 from "./clips/Clip01";
import Clip02 from "./clips/Clip02";
import Clip03 from "./clips/Clip03";
import Clip04 from "./clips/Clip04";
import Clip05 from "./clips/Clip05";
import Clip06_MotherHub from "./clips/Clip06_MotherHub";
import Clip06_Grapefruit from "./clips/Clip06_Grapefruit";
import Clip06_Lime from "./clips/Clip06_Lime";
import Clip06_Bergamot from "./clips/Clip06_Bergamot";
import Clip07 from "./clips/Clip07";
import "./styling/ScrollPrompt.css";

function ScenePlayer({ step, onDone }) {
  const clips = [
    Clip01,
    Clip02,
    Clip03,
    Clip04,
    Clip05,
    Clip06_MotherHub,
    Clip06_Grapefruit,
    Clip06_Lime,
    Clip06_Bergamot,
    Clip07,
  ];

  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    setShowPrompt(false);
    // only schedule prompt for steps 1 and 2
    if (step === 1 || step === 2) {
      const timer = setTimeout(() => setShowPrompt(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  if (step < 0 || step >= clips.length) return null;
  const ActiveClip = clips[step];

  return (
    <div className="scene-wrapper" style={{ position: "relative" }}>
      <ActiveClip play={true} zIndex={clips.length - step} onDone={onDone} />
      {showPrompt && (step === 1 || step === 2) && (
        <div className="scroll-prompt" />
      )}
    </div>
  );
}

export default ScenePlayer;
