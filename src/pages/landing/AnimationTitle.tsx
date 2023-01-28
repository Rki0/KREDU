import React, { useState, useMemo } from "react";
import { useInterval } from "../../hooks/useInterval";

function AnimationTitle() {
  const completedTitle1 = useMemo(() => {
    return "한국어?";
  }, []);

  const completedTitle2 = useMemo(() => {
    return "어떻게 공부해?";
  }, []);

  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const [landingTitle1, setLandingTitle1] = useState("");
  const [landingTitle2, setLandingTitle2] = useState("");

  useInterval(() => {
    if (count1 >= completedTitle1.length) {
      return;
    }

    setLandingTitle1((prev) => {
      let result = prev ? prev + completedTitle1[count1] : completedTitle1[0];

      setCount1((prev) => prev + 1);

      return result;
    });
  }, 150);

  useInterval(() => {
    if (count2 >= completedTitle2.length) {
      return;
    }

    if (count1 >= completedTitle1.length) {
      setLandingTitle2((prev) => {
        let result = prev ? prev + completedTitle2[count2] : completedTitle2[0];

        setCount2((prev) => prev + 1);

        return result;
      });
    }
  }, 150);

  return (
    <React.Fragment>
      <div className="flex flex-col items-center justify-center mt-2 mb-4 ml-2 text-3xl sm:text-5xl md:text-6xl lg:text-8xl lg:mb-6">
        <h1 className="text-[#e57373] animate-typingCursor1 mb-2">
          {landingTitle1}
        </h1>

        <h1 className="text-[#90caf9] animate-typingCursor2">
          {landingTitle2}
        </h1>
      </div>
    </React.Fragment>
  );
}

export default AnimationTitle;
