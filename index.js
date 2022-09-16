const url =
  "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/camsys%2Fsubway-alerts.json";
const KEY = "RQ7UJ06Y9276GVIVthnwR3vptADw64Jf3m4WdivN";
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
    console.log(data);
    renderData(data.entity);
  });

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

const renderData = (data) => {
  let html = "";

  for (i = 0; i < 5; i++) {
    let item = data[i];
    const filteredText = (text) => {
      let reg = /\[(.*?)\]/gm;
      let arr = text.match(reg);
      let arr2 = reg.exec(text);
      console.log(arr);
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

    let header_text = filteredText(item.alert.header_text.translation[0].text);
    let updated = getTime(item.alert.active_period[0].start);
    let isActive = true;
    let desc_text = "";

    //Check if active alert
    let currDate = new Date();
    let expiredDate = new Date(item.alert.active_period[0].end * 1000);
    if (currDate < expiredDate) {
      isActive = false;
    }

    // Check if there is desc text
    if (item.alert.hasOwnProperty("description_text")) {
      desc_text = filteredText(item.alert.description_text.translation[0].text);
    } else {
      desc_text = "No description available";
    }
    /* let desc_text = 2
        let updated = 3 */

    html += `

            <div class="card">
                <div class="card-top">
                    <p class="time">${updated}</p>
                    <p>${alert_status(isActive)}</p>
                </div>
                <div class="card-head">
                    <h1 class="header">${header_text}</h1>
                </div>
                <p class="desc">${desc_text}</h1> 
            </div> 
        
        `;
  }

  document.getElementById("content").innerHTML = html;
};
