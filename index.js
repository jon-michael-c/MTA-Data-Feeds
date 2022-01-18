const url = "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/camsys%2Fsubway-alerts.json"
const KEY = "y0502zWxdl9dgYO1NVYAQ17J3oKghY5q3SibNxp1"

const myHeaders = new Headers({
    'Content-Type':'application/json',
    'x-api-key':'4c4ufDTKBH4ehazHJh96s9XwPu0zr6zv5AWwlYVw'
})

fetch(url, {
    method: 'GET',
    headers: myHeaders
})
    .then((response => response.json()))
    .then(data => {
        console.log(data)
        renderData(data.entity)
    })


const getTime = (time) => {
    let utc = new Date(time * 1000)

    return utc
}

const renderData = (data) => {
    


    let html = ""

    for(let item of data) {
        const filteredText = (text) => {  
            let reg = /\[(.*?)\]/gm
            let arr = text.match(reg)
            let arr2 = reg.exec(text) 
            console.log(arr)
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


        let header_text = filteredText(item.alert.header_text.translation[0].text)
        let desc_text =  filteredText(item.alert.description_text.translation[0].text)
        let updated = getTime(item.alert.active_period[0].start)
        html += `

            <div class="card">
                <div class="card-head">
                    <p class="time">${updated}</p>
                    <h1 class="header">${header_text}</h1>
                </div>
                <p class="desc">${desc_text}</h1> 
            </div> 
        
        `
    }

    document.getElementById("content").innerHTML = html
}

