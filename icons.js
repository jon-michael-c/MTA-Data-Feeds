let letters = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "j",
  "l",
  "m",
  "n",
  "m",
  "q",
  "r",
  "s",
  "si",
  "t",
  "w",
  "z",
];

let html = ``;
for (let t of letters) {
  html += `<img src='./icons/${t}.svg' class="train-icon off"/>`;
}

document.getElementById("trains").innerHTML = html;
