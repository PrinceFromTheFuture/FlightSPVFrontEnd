import EditFlightReportNumbers from "./EditFlightReportNumbers";
import EditFlightReportKeyMoments from "./EditFlightReportKeyMoments";
import EditFlightReportPAGIAAgent from "./EditFlightReportPAGIAAgent";
import { useAppSelector } from "@/hooks/hooks";
import { useParams } from "react-router-dom";
import { oneFlight } from "@/redux/slices/flightsSlice";
import axios from "axios";

const EditFlightReport = () => {
  const { flightID } = useParams();
  console.log(flightID);
  if (flightID == undefined || "") {
    return <div>A problem occured</div>;
  }

  const flight = useAppSelector((state) => oneFlight(state, flightID));
  if (flight) {
    return (
      <div>
        <div className="flex justify-between items-center w-full gap-2">
          {" "}
          <EditFlightReportNumbers type="totalPassangers" />
          <EditFlightReportNumbers type="totalStrollers" />
          <EditFlightReportNumbers type="totalSuitcases" />{" "}
        </div>
        <div className=" my-4 flex flex-col justify-center items-center w-full gap-4">
          <EditFlightReportKeyMoments
            imgSrc="/store-blue.svg"
            type="countersOpening"
            label="Counters Openning"
          />
          <EditFlightReportKeyMoments
            imgSrc="/store-blue.svg"
            type="countersClosing"
            label="Couters Closing"
          />
          <EditFlightReportKeyMoments
            imgSrc="/megaphone.svg"
            type="openningBoardingPagia"
            label="Openning Boarding to Pagia"
          />
          <EditFlightReportKeyMoments
            imgSrc="/door-open-blue.svg"
            type="bordingStart"
            label="Bording Starts"
          />
          <EditFlightReportKeyMoments
            imgSrc="/door-closed.svg"
            type="bordingEnd"
            label="Bording Ends"
          />
          <EditFlightReportKeyMoments
            imgSrc="/plane-departure.svg"
            type="offBlock"
            label="Departure"
          />
          <EditFlightReportPAGIAAgent />
        </div>
        <div
          onClick={() => {
            axios
              .post(
                `${
                  import.meta.env.VITE_SERVER_BASE_ROUTE
                }/flights/generateFlightReport`,
                { flightId: flight.flightId },
                {
                  responseType: "arraybuffer", // Ensure response type is set to arraybuffer
                }
              )
              .then((response) => {
                // Create a Blob from the PDF content
                const pdfBlob = new Blob([response.data], {
                  type: "application/pdf",
                });
                // Generate a URL for the Blob
                const pdfUrl = URL.createObjectURL(pdfBlob);
                // Open a new window or tab with the PDF URL
                window.open(pdfUrl, "_blank");
              })
              .catch((error) => {
                console.error("Error fetching PDF:", error);
              });
          }}
          className=" mt-6 w-full rounded-xl bg-blue p-3 text-lg font-semibold text-white text-center cursor-pointer"
        >
          generate flight report
        </div>
      </div>
    );
  } else {
    return <div>erorr</div>;
  }
};

export default EditFlightReport;
