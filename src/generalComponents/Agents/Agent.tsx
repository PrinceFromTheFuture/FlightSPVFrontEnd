import { agentType } from "@/types";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface AgentProps {
  agent: agentType;
  selectedAgent?: agentType;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Agent = ({ agent, selectedAgent, onClick }: AgentProps) => {
  let imgSrc;
  if (agent.role === "Ramp Agent") {
    imgSrc = "/ramp.svg";
  } else if (agent.role === "SPV") {
    imgSrc = "/spv.svg";
  } else {
    imgSrc = "/user-blue.svg";
  }

  const isSelected = agent === selectedAgent ? true : false;

  return (
    <div
      onClick={onClick}
      className={cn(
        " w-full bg-lightGray relative rounded-xl p-2.5 flex justify-between items-center transition-all ",
        isSelected && "border-2"
      )}
    >
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
        <Dialog>
          <DialogTrigger>
            <div className=" h-full w-5 bg-blue rounded-lg flex justify-center items-center text-white text-3xl shadow-md">
              !
            </div>
          </DialogTrigger>
          <DialogContent className="">
            <div className=" text-blue font-bold text-2xl  ">
              {agent.name} note
            </div>
            <div className="text-gray text-md font-semibold ">
              {agent.notes}
            </div>
            <DialogClose className=" items-end ">
              <div className="py-2 bg-blue rounded-lg font-semibold px-4 text-white">
                Okay
              </div>
            </DialogClose>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Agent;
