const btnCalculate = document.querySelector(".btn");
const billAmountInput = document.querySelector(".input-billamount");
const cashGivenInput = document.querySelector(".input-cashgiven");
const outputContainer = document.querySelector(".container-output");
const msgContainer = document.querySelector(".container-msg");
const cashGivenTitle = document.querySelector(".cash-given-title");
const changeTitle = document.querySelector(".change-title");

const availableCurrency = [1, 5, 10, 20, 100, 500, 2000];
var totalChange = [];

const showMsg = (msg) => {
  removeMsg();
  const msgNode = document.createTextNode(msg);
  msgContainer.appendChild(msgNode);
};

const removeMsg = () => {
  msgContainer.innerHTML = "";
};

const clickHandler = () => {
  const billAmount = parseInt(billAmountInput.value);
  const cashGiven = parseInt(cashGivenInput.value);
  if (outputContainer.firstChild) {
    resetCounter();
    removeMsg();
    return;
  }
  if (billAmount) {
    removeMsg();
    if (cashGivenInput.style.display) {
      if (cashGivenInput.style.display !== "none") {
        if (billAmount && cashGiven) {
          if (cashGiven > billAmount) {
            removeMsg();
            calulateChange(billAmount, cashGiven);
          } else if (cashGiven === billAmount) {
            const para = document.createElement("p");
            const textNode = document.createTextNode("No change to return!");
            para.appendChild(textNode);
            outputContainer.appendChild(para);
            btnCalculate.innerText = "Reset";
          } else {
            showMsg("Cash given should be greater then bill amount!");
          }
        } else if (!cashGiven) {
          showMsg("Please input cash given!");
        } else {
          showMsg("Please input bill amount!");
        }
      } else {
        cashGivenInput.style.display = "block";
        cashGivenTitle.style.display = "block";
        btnCalculate.innerText = "Calculate";
      }
    } else {
      cashGivenInput.style.display = "block";
      cashGivenTitle.style.display = "block";
      btnCalculate.innerText = "Calculate";
    }
  } else {
    showMsg("Please input bill amount!");
  }
};

const calulateChange = (bill, cash) => {
  const cashAfterDeduction = cash - bill;
  calculateNumOfNote(cashAfterDeduction);
  displayTheChangeData(totalChange);
};

const calculateNumOfNote = (cashAfterDeduction) => {
  for (var i = 6; i > -1; i--) {
    if (
      availableCurrency[i] < cashAfterDeduction ||
      availableCurrency[i] == cashAfterDeduction
    ) {
      const numberofNote = Math.floor(
        cashAfterDeduction / availableCurrency[i]
      );
      const noteTotal = availableCurrency[i] * numberofNote;
      const remainingCash = cashAfterDeduction - noteTotal;
      const changeData = {
        note: availableCurrency[i],
        num: numberofNote,
        remainingCash: remainingCash,
      };
      totalChange.push(changeData);
      if (remainingCash) {
        calculateNumOfNote(remainingCash);
      }
      return;
    }
  }
};

const displayTable = () => {
  const th1 = document.createElement("th");
  const th2 = document.createElement("th");
  const headerNode1 = document.createTextNode("Note");
  const headerNode2 = document.createTextNode("No. of Notes");
  th1.appendChild(headerNode1);
  th2.appendChild(headerNode2);
  const tr = document.createElement("tr");
  tr.appendChild(th1);
  tr.appendChild(th2);
  outputContainer.appendChild(tr);
};

const displayTheChangeData = (totalChange) => {
  displayTable();
  for (var i in totalChange) {
    changeTitle.style.display = "block";
    const th1 = document.createElement("th");
    const th2 = document.createElement("th");
    const headerNode1 = document.createTextNode(totalChange[i].note);
    const headerNode2 = document.createTextNode(totalChange[i].num);
    th1.appendChild(headerNode1);
    th2.appendChild(headerNode2);
    const tr = document.createElement("tr");
    tr.appendChild(th1);
    tr.appendChild(th2);
    outputContainer.appendChild(tr);
  }
  btnCalculate.innerText = "Reset";
};

const resetCounter = () => {
  billAmountInput.value = "";
  cashGivenInput.value = "";
  outputContainer.innerHTML = "";
  cashGivenInput.style.display = "none";
  cashGivenTitle.style.display = "none";
  changeTitle.style.display = "none";
  totalChange = [];
  btnCalculate.innerText = "Next";
};

btnCalculate.addEventListener("click", clickHandler);
