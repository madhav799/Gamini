const loading = document.querySelector(".loader");
const hide_input = document.querySelector(".pnr-features-handling");
const show_out = document.querySelector(".pnr-details");
const show_error = document.querySelector(".top-error");
async function get_pnr_data(pnr) {
  const options = {
    method: "GET",
    url: "https://irctc1.p.rapidapi.com/api/v3/getPNRStatus",
    params: {
      pnrNumber: pnr,
    },
    headers: {
      "X-RapidAPI-Key": "e1aa14092bmsh46a7b7297d0ff9fp1a1491jsn9956860de603",
      "X-RapidAPI-Host": "irctc1.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response;
  } catch (error) {
    console.error(error);
    alert("Error fetching PNR data. Please try again.");
    return null; // Return null on error
  }
}

// Selecting elements
const pnr_input_gayab = document.querySelector(".top-top-pnr");
const pnr_no = document.querySelector(".pnr-input");
const submit_but = document.querySelector(".button-68");

const data_pnr = document.querySelector(".pnr-res-no");
const train_no = document.querySelector(".res-train-no");
const train_name = document.querySelector(".res-train-name");
const dateOJ = document.querySelector(".res-doj");
const tr_class = document.querySelector(".res-class");
const bo_stat = document.querySelector(".res-bo-st");
const des_stat = document.querySelector(".res-des-st");
const pass_count = document.querySelector(".res-pas-count");
const ticket_fare = document.querySelector(".res-fare");
const pantry = document.querySelector(".res-pantry");
const tcancel = document.querySelector(".res-cancel");

submit_but.addEventListener("click", async (e) => {
  if (pnr_no.value.length === 10) {
    loading.classList.add("active");
    pnr_input_gayab.classList.add("active");

    const response_data = await get_pnr_data(pnr_no.value);

    if (response_data && response_data.data && response_data.data.data) {
      data_pnr.innerHTML = response_data.data.data.Pnr || "N/A";
      train_no.innerText = response_data.data.data.TrainNo || "N/A";
      train_name.innerText = response_data.data.data.TrainName || "N/A";
      dateOJ.innerText = response_data.data.data.Doj || "N/A";
      tr_class.innerText = response_data.data.data.Class || "N/A";
      bo_stat.innerText = `${
        response_data.data.data.BoardingStationName || "N/A"
      } (${response_data.data.data.BoardingPoint || "N/A"})`;
      des_stat.innerText = `${
        response_data.data.data.ReservationUptoName || "N/A"
      } (${response_data.data.data.ReservationUpto || "N/A"})`;
      pass_count.innerText = response_data.data.data.PassengerCount || "N/A";
      ticket_fare.innerText = response_data.data.data.TicketFare || "N/A";
      // pantry.innerText = response_data.data.data.PassengerStatus[0] ||"N/A"
      //   ? `${
      //       response_data.data.data?.PassengerStatus[0].BookingBerthCode || "N/A"
      //     } (${
      //       response_data.data.data?.PassengerStatus[0].BookingBerthNo || "N/A"
      //     })`
      //   : "N/A";

      let tflag = response_data.data.data.TrainCancelledFlag;
      tcancel.innerText = tflag === "true" ? "Cancelled" : "Not cancelled";
    } else {
      console.error("Invalid response data:", response_data);
      alert("Could not retrieve PNR details. Please try again.");
    }

    loading.classList.remove("active");
    hide_input.classList.add("active");
    if (
      response_data.data.data.TrainName &&
      response_data.data.data.TrainName.length > 0
    )
      show_out.classList.add("active");
    else {
      show_error.classList.add("active");
    }
  } else {
    alert("Please enter a valid 10-digit PNR number.");
  }
});
