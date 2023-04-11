const getData = (trains) => {
  const url =
    "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/camsys%2Fsubway-alerts.json";
  const KEY = "KuT6BMeHGC67rxrbYj7Ie5pCShL2qEKs9NbnIOIh";
  const darkMode = false;

  const setTheme = () => {
    if (!darkMode) {
      $("body").addClass("dark");
      darkMode = true;
    } else {
      $("body").removeClass("dark");
      darkMode = false;
    }
  };

  const myHeaders = new Headers({
    "Content-Type": "application/json",
    "x-api-key": KEY,
  });

  fetch(url, {
    method: "GET",
    headers: myHeaders,
  })
    .then((response) => response.json())
    .then((data) => {
      let newData = data.entity;
      trains = Array.from(trains);
      if (trains.length != 0) {
        newData = newData.filter((item) => {
          return item.alert.informed_entity.some((entity) => {
            return trains.includes(entity.route_id);
          });
        });
      }
      console.log(newData);
      renderData(newData, trains);
    });
};
const getTime = (time) => {
  let utc = new Date(time * 1000);

  return `${utc.toLocaleTimeString()} ${utc.toLocaleDateString()}`;
};

const alert_status = (isActive) => {
  if (isActive) {
    return `<button class="active">Active</button>`;
  } else {
    return `<button class="expired">Expired</button>`;
  }
};

const getDiff = (timestamp2, timestamp1) => {
  const date1 = new Date(timestamp1); // Convert to Date object
  const date2 = new Date(timestamp2); // Convert to Date object

  const diffMs = date2 - date1; // Difference in milliseconds

  // Calculate hours and minutes separately
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return `${diffHours} h ${diffMins} m`;
};

const renderData = (data, trains) => {
  let html = "";
  let html1 = "";
  trains = Array.from(trains);

  const regex = /alert/;
  const filteredData = data.filter((item) => regex.test(item.id));
  if (filteredData.length != 0) {
    for (i = 0; i < filteredData.length; i++) {
      let item = filteredData[i];
      const filteredText = (text) => {
        let reg = /\[(.*?)\]/gm;
        let arr = text.match(reg);
        let arr2 = reg.exec(text);
        let newText = text;

        if (arr2 != null) {
          for (let letter of arr) {
            let train = letter.charAt(1).toLowerCase();
            newText = newText.replace(
              letter,
              `<img src="./icons/${train}.svg" id="icon"/>`
            );
          }
        } else {
          return text;
        }

        return newText;
      };

      let header_text = filteredText(
        item.alert.header_text.translation[0].text
      );
      let created = getTime(
        item.alert["transit_realtime.mercury_alert"].created_at
      );

      let isActive = true;
      let desc_text = "";

      //Check if active alert
      let currDate = new Date();
      let expiredDate = new Date(item.alert.active_period[0].end * 1000);
      if (currDate < expiredDate) {
        isActive = false;
      }

      let lastUpdated = getDiff(
        currDate,
        new Date(item.alert["transit_realtime.mercury_alert"].updated_at * 1000)
      );
      // Check if there is desc text
      if (item.alert.hasOwnProperty("description_text")) {
        desc_text = filteredText(
          item.alert.description_text.translation[0].text
        );
      } else {
        desc_text = "No description available";
      }
      /* let desc_text = 2
        let updated = 3 */

      html += `

            <div class="card">
                <div class="card-top">
                    <p class="time">${created}</p>
                </div>
                <div class="card-head">
                    <h1 class="header">${header_text}</h1>
                </div>
                <p class="desc">${desc_text}</h1> 
            </div> 
        
        `;
    }
  } else {
    html = `
      <div class="nothing">
      <h1>No active alerts</h1>     
      </div>
    `;
  }

  document.getElementById("content").innerHTML = html;

  const plannedData = data.filter((item) => /planned_work/.test(item.id));

  if (plannedData.length != 0) {
    for (i = 0; i < plannedData.length; i++) {
      let item = plannedData[i];
      const filteredText = (text) => {
        let reg = /\[(.*?)\]/gm;
        let arr = text.match(reg);
        let arr2 = reg.exec(text);
        let newText = text;

        if (arr2 != null) {
          for (let letter of arr) {
            let train = letter.charAt(1).toLowerCase();
            newText = newText.replace(
              letter,
              `<img src="./icons/${train}.svg" id="icon"/>`
            );
          }
        } else {
          return text;
        }

        return newText;
      };

      let header_text = filteredText(
        item.alert.header_text.translation[0].text
      );
      let created = getTime(
        item.alert["transit_realtime.mercury_alert"].created_at
      );

      let isActive = true;
      let desc_text = "";

      //Check if active alert
      let currDate = new Date();
      let expiredDate = new Date(item.alert.active_period[0].end * 1000);
      if (currDate < expiredDate) {
        isActive = false;
      }

      let lastUpdated = getDiff(
        currDate,
        new Date(item.alert["transit_realtime.mercury_alert"].updated_at * 1000)
      );
      // Check if there is desc text
      if (item.alert.hasOwnProperty("description_text")) {
        desc_text = filteredText(
          item.alert.description_text.translation[0].text
        );
      } else {
        desc_text = "No description available";
      }
      /* let desc_text = 2
        let updated = 3 */

      html1 += `

            <div class="card">
                <div class="card-top">
                    <p class="time">${created}</p>
                </div>
                <div class="card-head">
                    <h1 class="header">${header_text}</h1>
                </div>
                <p class="desc">${desc_text}</h1> 
            </div> 
        
        `;
    }
  } else {
    html = `
      <div class="nothing>
      <h1>No Planned Work</h1>
      </div> 
    `;
  }

  document.getElementById("planned").innerHTML = html1;
};
