import { useAppSelector } from "@/hooks/hooks";
import { cn } from "@/lib/utils";
import { oneFlight } from "@/redux/slices/flightsSlice";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FlihtChatConversation = () => {
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
  const testConversation: {
    author: string;
    messegeType: "image" | "text";
    content: string;
  }[] = [
    {
      author: "amir",
      content:
        "https://i.ytimg.com/vi/JxcpCCnJgwg/hq720.jpg?sqp=-oaymwE2CNAFEJQDSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARhyIFooPTAP&rs=AOn4CLC1HzKt-TnB05WgPHa2Nn1lWsUggw",
      messegeType: "image",
    },
    {
      author: "amir",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
      messegeType: "text",
    },
    {
      author: "yosi",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
      messegeType: "text",
    },
  ];

  const user = "amir";

  return (
    <div className="h-full w-contentMaxWidth overflow-auto my-3">
      {testConversation.map((message) => {
        if (message.messegeType === "image") {
          return (
            <div
              className={cn(
                "bg-gray font-medium text-white rounded-2xl max-w-[90%] mb-3  "
              )}
            >
              <div className="p-2">{message.author}</div>
              <img
                src={message.content}
                className="w-full h-full rounded-b-2xl"
                alt=""
              />
            </div>
          );
        } else {
          return (
            <div
              className={cn(
                " w-full flex flex-col justify-start items-start mb-3",
                message.author === user && "items-end"
              )}
            >
              {message.author !== user && (
                <div className="ml-2 mb-1">{message.author}</div>
              )}
              <p
                className={cn(
                  "bg-deepGray font-medium text-white rounded-lg p-2 max-w-[90%]  ",
                  message.author === user && "bg-blue"
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
