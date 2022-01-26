# Using MTA Realtime API to Display an Alert Feed

The MTA provides free API services for anyone to figure why their train is delayed. They have tons of data easily accessable.

In this project, I will creating a feed showing the lastest service alerts for the NY subway system.

## Getting the Data

First, we must request data using fetch. The data being retrieve is from [here](file:///C:/Users/Deionna/AppData/Local/Temp/mta.html#)

```js
const url = "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/camsys%2Fsubway-alerts.json"
const KEY = "y0502zWxdl9dgYO1NVYAQ17J3oKghY5q3SibNxp1"

fetch(url, {
        method: 'GET',
        headers: myHeaders
    })
.then((response => response.json()))
.then(data => {
        console.log(data)
})
```

This gives back the data is a json format as seen here. The API brings back an array of objects with five items:

- active_period

- desciption_text

- header_text

- informed_text

- transit_realtime.mercury_alert

Example:

![example-response](https://user-images.githubusercontent.com/53241212/151103199-43c008e4-7993-4216-92c6-1fc6f85def35.jpg)

Now that we have the data, must display it. In this case, the service alerts will listed on a card showing the header text and the description, as well as the time uploaded to the system.

To do this, a functions needs to created that will render html 
associated with the data. This render functions will then be executed 
after the fetch request is completed.

```js
const renderData = (data) => {
    let html = ""

    html += `

        <div class="card">
            <div class="card-head">
                <p class="time">${updated}</p>
                <h1 class="header">${header_text}</h1>
            </div>
            <p class="desc">${desc_text} </h1> 
        </div> 

        `
    }

    document.getElementById("content").innerHTML = html
```

## Putting the Subway Icons on the Results

In order to display the result with the corresponding subway icons, the text must be parsed before it renders to the page. In the javascript, that is taken care by using regex and replacing the selected text into an image of the appropriate icon.

```js
const filteredText = (text) => {  
    let reg = /\[(.*?)\]/gm
    let arr = text.match(reg)
    let arr = reg.exec(text)
    let newText= text

    if (arr2 != null) {
        for (let letter of arr) {
            let train = letter.charAt(1).toLowerCase()
            newText = newText.replace(letter, `<img src="./icons/${train}.svg" id="icon"/>`)
        }
    } else {
        return text
    } 

    return newText
}
```
