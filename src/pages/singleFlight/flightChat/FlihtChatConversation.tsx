import { useAppSelector } from "@/hooks/hooks";
import { cn } from "@/lib/utils";
import { oneFlight } from "@/redux/slices/flightsSlice";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { flightConversation } from "@/types";

const FlihtChatConversation = ({
  conversation,
}: {
  conversation: flightConversation;
}) => {
  const navigate = useNavigate();
  const { flightID } = useParams();
  if (flightID == undefined || "") {
    return <div>A problem occured</div>;
  }
  const flight = useAppSelector((state) => oneFlight(state, flightID));
  if (!flight) {
    useEffect(() => {
      navigate("/");
    }, []);
    return null;
  }

  const user = "amir";

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom of the chat container when messages change
    if (containerRef.current) {
      // Use setTimeout to ensure scrolling occurs after rendering
      setTimeout(() => {
        console.log(
          containerRef.current!.scrollTop,
          containerRef.current!.scrollHeight
        );
        containerRef.current!.scrollTop = containerRef.current!.scrollHeight;
      }, 70);
    }
  }, [conversation]);

  return (
    <div
      ref={containerRef}
      className="h-full w-contentMaxWidth overflow-auto my-3"
    >
      {conversation.messages.map((message) => {
        if (message.messageType === "image") {
          return (
            <div
              className={cn(
                "font-medium text-white   mb-2 w-full flex flex-col justify-start items-end   ",
                message.author.name === user && "items-end"
              )}
            >
              <div
                className={cn(
                  "max-w-[60%] rounded-2xl bg-gray ",
                  message.author.name === user && "bg-blue"
                )}
              >
                <div className="p-2">{message.author.name}</div>
                <img
                  src={message.content}
                  className="w-full h-full rounded-b-2xl "
                  alt=""
                />
              </div>
            </div>
          );
        } else {
          return (
            <div
              className={cn(
                " w-full flex flex-col justify-start items-start mb-2 font-heebo font-semibold",
                message.author.name === user && "items-end"
              )}
            >
              {message.author.name !== user && (
                <div className="ml-2 mb-1">{message.author.name}</div>
              )}
              <p
                className={cn(
                  "bg-gray/50 font-normal text-black rounded-lg p-2 max-w-[90%]  ",
                  message.author.name === user && "bg-blue/50"
                )}
              >
                {message.content}
              </p>
            </div>
          );
        }
      })}
    </div>
  );
};

export default FlihtChatConversation;
