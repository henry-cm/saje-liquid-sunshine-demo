// src/App.jsx
import { useState, useEffect, useRef } from "react";
import ScenePlayer from "./components/ScenePlayer";

function App() {
  const [step, setStep] = useState(0);
  const scrollLockRef = useRef(false);
  const touchStartY = useRef(null);

  // Handler for wheel events (desktop)
  const handleWheel = (e) => {
    if (scrollLockRef.current) return;

    e.preventDefault();
    scrollLockRef.current = true; // lock scroll until video ends

    // only advance on wheel down (deltaY > 0), ignore wheel up
    if (e.deltaY > 0) {
      setStep((prev) => {
        // Prevent scroll into Clip05 from Clip04, and no backward
        if (prev === 3 || prev === 0) return prev;
        return Math.min(prev + 1, 6);
      });
    }
  };

  // Handlers for touch events (mobile)
  const handleTouchStart = (e) => {
    touchStartY.current = e.changedTouches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (scrollLockRef.current) return;

    const touchEndY = e.changedTouches[0].clientY;
    const delta = touchStartY.current - touchEndY;

    // Only proceed if the swipe is downward and significant
    if (delta <= 0 || Math.abs(delta) < 30) return;

    scrollLockRef.current = true;
    setStep((prev) => {
      // Prevent scroll into Clip05 from Clip04, and no backward
      if (prev === 3 || prev === 0) return prev;
      return Math.min(prev + 1, 6);
    });
  };

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const handleClipDone = (value) => {
    if (value === "combine") {
      setStep(9); // replace with actual index of Clip07
      scrollLockRef.current = true;
      return;
    }

    if (value === "home") {
      setStep(0); // Goes back to Clip01
      scrollLockRef.current = true;
      return;
    }

    if (value === "bergamot") {
      setStep(8); // Or whichever step number follows
      scrollLockRef.current = true;
      return;
    }

    if (value === "lime") {
      setStep(7); // or next available step
      scrollLockRef.current = true;
      return;
    }

    if (value === "grapefruit") {
      setStep(6); // jump to Clip06_Grapefruit
      scrollLockRef.current = true;
      return;
    }

    if (value === "ingredients") {
      setStep(5); // Clip06_MotherHub
      scrollLockRef.current = true;
      return;
    }

    // existing logic follows...

    // Special scroll lock cases
    if (step === 0) {
      setStep(1);
      scrollLockRef.current = true;
      return;
    }

    if (step === 3) {
      setStep(4);
      scrollLockRef.current = true;
      return;
    }

    if (step === 4) {
      setStep(5);
      scrollLockRef.current = true;
      return;
    }

    // ✅ Unlock scroll after normal scenes like Clip 1 → Clip 2 → Clip 3
    scrollLockRef.current = false;

    // Optional: Re-lock for Clip05 once step === 4
    setTimeout(() => {
      if (step === 4) {
        scrollLockRef.current = true;
      }
    }, 100);
  };

  return (
    <>
      <ScenePlayer step={step} onDone={handleClipDone} />
    </>
  );
}

export default App;
