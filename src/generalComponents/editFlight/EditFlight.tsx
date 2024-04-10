import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useAppSelector } from "@/hooks/hooks";
import { oneFlight } from "@/redux/slices/flightsSlice";
import dayjs from "dayjs";
import { useState } from "react";
import { useParams } from "react-router-dom";

const EditFlight = () => {
  const { flightID } = useParams();
  console.log(flightID);
  if (flightID == undefined || "") {
    return <div>A problem occured</div>;
  }

  const flight = useAppSelector((state) => oneFlight(state, flightID));
  if (flight) {
    const [flightMetaData, setFlightMetaData] = useState({
      flightNumber: flight.flightNumber,
      gate: flight.gate,
      counters: flight.counters,
      departure: flight.keyMoments.planned.departure,
      origin: flight.origin.code,
      destenation: flight.destenation.code,
    });

    return (
      <Drawer>
        <DrawerTrigger>
          {" "}
          <div className="flex justify-start items-center gap-2.5 font-medium">
            <img src="/pen-blue.svg" alt="" className="w-3" />
            <div> Edit</div>
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <div className="flex flex-col justify-center items-center w-full gap-4 mb-3">
            <Dialog>
              <DialogTrigger className=" bg-lightGray rounded-lg w-full flex justify-start gap-3 items-center p-2.5">
                <img src="/plane-departure.svg" className="w-4" />

                <div className="">
                  <div className="  text-sm font-semibold text-gray  mb-1 text-left">
                    Flight Number
                  </div>
                  <div className="   text-md font-bold text-blue text-left">
                    {flightMetaData.flightNumber}
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="">
                <div className=" text-blue font-bold text-2xl  "></div>
                <input
                  type="text"
                  value={flightMetaData.flightNumber}
                  onChange={(event) =>
                    setFlightMetaData({
                      ...flightMetaData,
                      flightNumber: event.target.value,
                    })
                  }
                  className="text-lg font-semibold  outline-none border-2 border-blue text-center text-blue rounded-lg p-2"
                />
                <DialogClose className=" items-end ">
                  <div className="py-2 bg-blue rounded-lg font-semibold px-4 text-white">
                    Save
                  </div>
                </DialogClose>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger className=" bg-lightGray rounded-lg w-full flex justify-start gap-3 items-center p-2.5">
                <div className="flex flex-col">
                  <img src="/plane-departure-gray.svg" className="w-4" />
                  <div className="w-2 border-l-2 border-dashed border-gray h-3 ml-2 mt-1"></div>
                </div>

                <div className="">
                  <div className="  text-sm font-semibold text-gray  mb-1 text-left">
                    From
                  </div>
                  <div className="   text-md font-bold text-blue text-left">
                    {flightMetaData.origin}
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="">
                <div className=" text-blue font-bold text-2xl  "></div>
                <input
                  type="text"
                  value={flightMetaData.origin}
                  className="text-lg font-semibold  outline-none border-2 border-blue text-center text-blue rounded-lg p-2"
                />
                <DialogClose className=" items-end ">
                  <div className="py-2 bg-blue rounded-lg font-semibold px-4 text-white">
                    Save
                  </div>
                </DialogClose>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger className=" bg-lightGray rounded-lg w-full flex justify-start gap-3 items-center p-2.5">
                <div>
                  <div className="w-2 border-l-2 border-dashed border-gray h-3 ml-2 mb-1"></div>
                  <img src="/plane-departure-gray.svg" className="w-4" />
                </div>
                <div className="">
                  <div className="  text-sm font-semibold text-gray  mb-1 text-left">
                    To
                  </div>
                  <div className="   text-md font-bold text-blue text-left">
                    {flightMetaData.destenation}
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="">
                <div className=" text-blue font-bold text-2xl  "></div>
                <input
                  type="text"
                  value={flightMetaData.destenation}
                  className="text-lg font-semibold  outline-none border-2 border-blue text-center text-blue rounded-lg p-2"
                />
                <DialogClose className=" items-end ">
                  <div className="py-2 bg-blue rounded-lg font-semibold px-4 text-white">
                    Save
                  </div>
                </DialogClose>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger className=" bg-lightGray rounded-lg w-full flex justify-start gap-3 items-center p-2.5">
                <img src="/door-open-gray.svg" alt="" className="w-4" />
                <div className="">
                  <div className="  text-sm font-semibold text-gray  mb-1 text-left">
                    Gate
                  </div>
                  <div className="   text-md font-bold text-blue text-left">
                    {flightMetaData.gate}
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="">
                <div className=" text-blue font-bold text-2xl  "></div>
                <input
                  type="text"
                  value={flightMetaData.gate}
                  onChange={(event) =>
                    setFlightMetaData({
                      ...flightMetaData,
                      gate: event.target.value,
                    })
                  }
                  className="text-lg font-semibold  outline-none border-2 border-blue text-center text-blue rounded-lg p-2"
                />
                <DialogClose className=" items-end ">
                  <div className="py-2 bg-blue rounded-lg font-semibold px-4 text-white">
                    Save
                  </div>
                </DialogClose>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger className=" bg-lightGray rounded-lg w-full flex justify-start gap-3 items-center p-2.5">
                <img src="/store-gray.svg" alt="" className="w-4" />
                <div className="">
                  <div className="  text-sm font-semibold text-gray  mb-1 text-left">
                    Counters
                  </div>
                  <div className="   text-md font-bold text-blue text-left">
                    {flightMetaData.counters}
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="">
                <div className=" text-blue font-bold text-2xl  "></div>
                <input
                  type="text"
                  value={flightMetaData.counters}
                  onChange={(event) =>
                    setFlightMetaData({
                      ...flightMetaData,
                      counters: event.target.value,
                    })
                  }
                  className="text-lg font-semibold  outline-none border-2 border-blue text-center text-blue rounded-lg p-2"
                />
                <DialogClose className=" items-end ">
                  <div className="py-2 bg-blue rounded-lg font-semibold px-4 text-white">
                    Save
                  </div>
                </DialogClose>
              </DialogContent>
            </Dialog>
            <div className="w-full">
              <input
                type="datetime-local"
                value={dayjs(flightMetaData.departure).format(
                  "YYYY-MM-DDTHH:MM"
                )}
                id="departure"
                className=" absolute invisible"
              />
              <label
                htmlFor="departure"
                className=" bg-lightGray rounded-lg w-full flex justify-start gap-3 items-center p-2.5"
              >
                <img src="/calendar-days-gray.svg" alt="" className="w-4" />
                <div className="">
                  <div className="  text-sm font-semibold text-gray  mb-1 text-left">
                    Departure Date
                  </div>
                  <div className="   text-md font-bold text-blue text-left">
                    {dayjs(flightMetaData.departure).format("DD MMM HH:mm")}
                  </div>
                </div>
              </label>
            </div>
          </div>

          <DrawerClose className="bg-blue w-full py-3 text-white font-semibold font-sm rounded-xl">
            Save Changes
          </DrawerClose>
        </DrawerContent>
      </Drawer>
    );
  } else {
    return <div>error</div>;
  }
};

export default EditFlight;
