let pElements = document.querySelectorAll(".puzzle");
const pBlank = document.querySelector("#p3");
const turn = document.querySelector(".turn");
const refreshBtn = document.querySelector(".refreshBtn");
const diff = document.querySelector(".difficulty");
const win = document.querySelector(".imgWin");
let matchNumber = 0;
for (let i = 0; i < pElements.length; i++) {
  pElements[i].style.order = i + 1;
}
let dragID;
let dropID;
let turnCounter = 0;
let difficulty = 10;
let test = 1;
let countConversion = 2;

while (countConversion % 2 == 0) {
  // Shuffle
  countConversion=1;
  for  (let shuffle = 1; shuffle <= difficulty; shuffle++) {
    let r1 = Math.round(Math.random() * 8);
    let r2 = Math.round(Math.random() * 8);

    let temp = pElements[r1].style.order;
    pElements[r1].style.order = pElements[r2].style.order;
    pElements[r2].style.order = temp;
  }
  let arr = [];
  let k=1;
  while(k<=9){
  for (let z = 0; z < pElements.length; z++) {
    if(parseInt(pElements[z].style.order)==k){arr.push(parseInt(pElements[z].innerText)); k++}
    }
  }
  console.log("arr",arr)

  for (let v = 0; v < pElements.length; v++) {
    for (let c = v + 1; c < pElements.length - 1; c++) {
      // console.log(pElements[c+1].style.order);
      if (arr[v] > arr[c] && arr[c] != "3" && arr[v] != "3") {
        countConversion++;
      }
      
    }
  }
  console.log("countConversion", countConversion);
}

for (let i = 0; i < pElements.length; i++) {
  pElements[i].addEventListener("dragstart", (event) => {
    dragID = i;
    dragOrder = parseInt(pElements[i].style.order);
    if (matchNumber == 9) {
      turn.innerHTML = `WIN-Turn:${turnCounter}`;
      win.style.display = "block";
    }
  });
}
for (let k = 0; k < pElements.length; k++) {
  pElements[k].addEventListener("dragover", (event) => {
    event.preventDefault();
  });
}
for (let j = 0; j < pElements.length; j++) {
  pElements[j].addEventListener("drop", (event) => {
    event.preventDefault();
    dropOrder = parseInt(pElements[j].style.order);

    min = dragOrder - 3; //manimum drag order to drop
    max = dragOrder + 3; //maximum drag order to drop
    sum = dragOrder + dropOrder;

    // Preventing consecutive neighbour element swap
    if (dragOrder == 3 && dropOrder == 4) {
      test = 0;
    }
    if (dragOrder == 4 && dropOrder == 3) {
      test = 0;
    }
    if (dragOrder == 6 && dropOrder == 7) {
      test = 0;
    }
    if (dragOrder == 7 && dropOrder == 6) {
      test = 0;
    }

    // drag and drop neighbour elements within range(-+3)
    if (dropOrder >= min && dropOrder <= max && sum % 2 !== 0 && test > 0) {
      if (pElements[j] == pBlank) {
        dropID = j;
        [pElements[dragID].style.order, pElements[dropID].style.order] = [
          pElements[dropID].style.order,
          pElements[dragID].style.order,
        ];
        turnCounter++;
        turn.innerHTML = `Turn:${turnCounter}`;
      }
    }
    let matchNumber = 0;
    for (let s = 0; s < pElements.length; s++) {
      if (pElements[s].innerText == pElements[s].style.order) {
        matchNumber++;
      }
      if (matchNumber == 9) {
        turn.innerHTML = `WIN-Turn:${turnCounter}`;
        win.style.display = "block";
      }
    }

    test++;
  });
}
refreshBtn.addEventListener("click", () => {
  window.location.reload();
});
