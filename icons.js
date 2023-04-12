let letters = [
  "a",
  "c",
  "e",
  "b",
  "d",
  "f",
  "m",
  "g",
  "j",
  "z",
  "l",
  "n",
  "q",
  "r",
  "w",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "s",
  "si",
];

const updateData = (trainID) => {
  if (global.has(trainID)) {
    global.delete(trainID);
  } else {
    global.add(trainID);
  }
  getData(global);
  console.log(trainID);
  const elem = document.getElementById(trainID);
  console.log(elem);

  if (elem.classList.contains("on")) {
    elem.classList.remove("on");
    elem.classList.add("off");
  } else {
    elem.classList.remove("off");
    elem.classList.add("on");
  }
};

const resetIcons = () => {
  for (let t of letters) {
    const elem = document.getElementById(t.toUpperCase());
    if (elem.classList.contains("on")) {
      elem.classList.remove("on");
      elem.classList.add("off");
    }
  }

  global = new Set();
  getData(global);
};
let html = ``;
for (let t of letters) {
  html += `<div class="off" id=\'${t.toUpperCase()}\' onclick="updateData(\'${t}\'.toUpperCase())"><img src='./icons/${t}.svg' class="train-icon"/></div>`;
}

document.getElementById("trains").innerHTML = html;
