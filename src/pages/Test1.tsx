// MultiStageForm.js
import React, { useState } from "react";
import "./MultiStageForm.css"; // Import your CSS file for styling and transitions
import { cn } from "@/lib/utils";

const Test1 = () => {
  const [stage, setStage] = useState(0);
  const totalStages = 3; // Adjust as per your form stages

  const nextStage = () => {
    if (stage < totalStages - 1) {
      setStage(stage + 1);
    }
  };

  const prevStage = () => {
    if (stage > 0) {
      setStage(stage - 1);
    }
  };

  return (
    <div className="multi-stage-form transition-all w-full bg-lightGray h-[50vh] overflow-hidden">
      {" "}
      <div
        className=" w-fit bg-gray h-8 overflow-visible flex justify-between transition-all  duration-1000"
        style={{ transform: `translateX(-${(100 / totalStages) * stage}%)` }}
      >
        <div
          className={cn(
            "w-contentMaxWidth h-8  transition-all duration-500",
            stage === 0 ? "opacity-100" : "opacity-0"
          )}
        >
          stage 1
        </div>
        <div
          className={cn(
            "w-contentMaxWidth h-8 bg-blue  transition-all duration-500 text-white ease-in-out",
            stage === 1 ? "opacity-100" : "opacity-0"
          )}
        >
          stage 2
        </div>
        <div
          className={cn(
            "w-contentMaxWidth h-8 transition-all duration-500 ",
            stage === 2 ? "opacity-100" : "opacity-0"
          )}
        >
          stage 3
        </div>
      </div>
      <div className="p-4 bg-blue text-white" onClick={nextStage}>
        next
      </div>
      <div className="p-4 bg-blue text-white" onClick={prevStage}>
        Back
      </div>
    </div>
  );
};

const Stage1 = () => {
  return (
    <div>
      {/* Stage 1 content */}
      <h2>Stage 1</h2>
      {/* Add your form fields and logic for this stage */}
    </div>
  );
};

const Stage2 = () => {
  return (
    <div>
      {/* Stage 2 content */}
      <h2>Stage 2</h2>
      {/* Add your form fields and logic for this stage */}
    </div>
  );
};

const Stage3 = () => {
  return (
    <div>
      {/* Stage 3 content */}
      <h2>Stage 3</h2>
      {/* Add your form fields and logic for this stage */}
    </div>
  );
};

export default Test1;
