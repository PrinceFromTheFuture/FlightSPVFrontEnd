import { useAppSelector } from "@/hooks/hooks";
import { oneFlight } from "@/redux/slices/flightsSlice";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import FlihtChatConversation from "./FlihtChatConversation";
import TextareaAutosize from "react-textarea-autosize";
import ImageMessage from "./ImageMessage";
import { flightConversation } from "@/types";
import axios from "axios";

const FlightChat = () => {
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

  const [conversation, setConversation] = useState<
    flightConversation | undefined
  >(undefined);
  useEffect(() => {
    const getConverSation = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_ROUTE}/conversations/${flightID}`
      );
      setConversation(response.data);
      console.log(response.data);
    };
    getConverSation();
  }, []);

  return (
    <div className=" flex justify-between items-center  flex-col  fixed  right-[0px] left-[0px] top-[0px] bottom-[0px] bg-lightGray">
      <div className=" bg-white   pt-[6vw] w-full flex justify-center pb-4 shadow-md items-center rounded-b-xl ">
        <div className="w-contentMaxWidth flex justify-start items-center ">
          <Link
            to={`/singleFlight/${flightID}`}
            className=" bg-lightGray  rounded-xl w-7 h-7 flex justify-center items-center"
          >
            <img src="/arrow.svg" alt="432  " className="rotate-180 w-4 " />
          </Link>
          <div className="ml-3 text-xl font-semibold text-blue">
            {" "}
            {flight.flightNumber}{" "}
            <span className="text-gray font-medium text-lg">
              {dayjs(flight.keyMoments.planned.departure).format("DD/MM ddd")}
            </span>
          </div>
        </div>
      </div>
      {conversation && <FlihtChatConversation conversation={conversation} />}
      <div className=" bottom-[0px] w-contentMaxWidth mb-[6vw]  flex  justify-between gap-2 items-end ">
        <div className=" w-full bg-white rounded-md shadow-sm flex justify-between items-center p-3 h-auto">
          <TextareaAutosize
            maxRows={5}
            name=""
            id=""
            placeholder="type here somthing..."
            className="w-[90%] outline-none border-none  resize-none "
          ></TextareaAutosize>
          <div className="w-4 flex justify-center items-center h-full">
            <img src="/paper-plane-solid.svg" alt="" />
          </div>
        </div>
        <ImageMessage />
      </div>
    </div>
  );
};

export default FlightChat;
