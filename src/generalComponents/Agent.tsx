import { agentType } from "@/types";
import React from "react";

interface AgentProps {
  agent: agentType;
}

const Agent = ({ agent }: AgentProps) => {
  let imgSrc;
  if (agent.role === "Ramp Agent") {
    imgSrc = "/ramp.svg";
  } else if (agent.role === "SPV") {
    imgSrc = "/spv.svg";
  } else {
    imgSrc = "/user-blue.svg";
  }

  return (
    <div className=" w-full bg-lightGray relative rounded-xl h-[75px] p-3 flex justify-between items-center ">
      <div className="  flex justify-start items-center  ml-2">
        {" "}
        <div className="w-4 h-4">
          <img src={imgSrc} alt="fdsf" />
        </div>
        <div className="ml-4 flex flex-col ">
          <div className="text-gray text-sm font-semibold ">{agent.role}</div>
          <div className="   text-lg font-bold text-blue">{agent.name}</div>
        </div>
      </div>
      {agent.notes != undefined && (
        <div className=" h-full w-5 bg-blue rounded-lg flex justify-center items-center text-white text-3xl shadow-md">
          !
        </div>
      )}
    </div>
  );
};

export default Agent;
