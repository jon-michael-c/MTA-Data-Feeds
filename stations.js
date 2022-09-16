let stationUrl = "https://mtaapi.herokuapp.com/stations";
let stations = [];
const fetchStations = () => {
  fetch(stationUrl, { "Content-Type": "application/json" })
    .then((resp) => resp.json())
    .then((stationsData) => {
      console.log(stationsData.result);
      stations = stationsData;
      renderStations(stationsData.result);
    });
};

fetchStations();
function removeDuplicateObjectFromArray(array, key) {
  return array.filter(
    (obj, index, self) => index === self.findIndex((el) => el[key] === obj[key])
  );
}

const renderStations = (data) => {
  let stationHTML = ``;
  let selectedStations = data.filter((e) => {
    return e.id.charAt(0) === "A";
  });

  selectedStations.sort();

  selectedStations = removeDuplicateObjectFromArray(selectedStations, "name");

  for (let station of selectedStations) {
    stationHTML += `
        <div class='station-container' onclick="fetchStationTimes('${
          station.id
        }')">
            <p>${station.name}</p>
            <div>
                <img src="./icons/${station.id
                  .charAt(0)
                  .toLowerCase()}.svg" class="train-icon on" />
            </div>
        </div>
    `;
  }

  console.log(selectedStations);

  $(".stations").append(stationHTML);
};

const fetchStationTimes = (id) => {
  fetch(`https://mtaapi.herokuapp.com/api?id=${id}`)
    .then((resp) => resp.json())
    .then((times) => {
      console.log(times.result);
      renderTimes(id, times.result);
    });
};

const renderTimes = (id, data) => {
  data.arrivals.sort();

  let timesHTML = ``;

  for (let i = 0; i < 5; i++) {
    let time = data.arrivals[i];
    let currTime = new Date();
    let h = parseInt(time.substring(0, 2));
    let m = parseInt(time.substring(3, 5));
    let s = parseInt(time.substring(7, 9));
    currTime.setHours(h);
    currTime.setMinutes(m);
    currTime.setMinutes(s);

    timesHTML += `
        <div class="card">
            <p>${time}</p>
            <p>${currTime.toLocaleTimeString()}</p>
        </div>
    
    `;
  }

  $(".times").html(timesHTML);
};
