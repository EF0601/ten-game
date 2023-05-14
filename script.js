//THIS IS THE MAIN SCRIPT
//!GATE IS USED INSTEAD OF SWITCH BECAUSE SWITCH IS A RESERVED WORD
//displays
const gate1dis = document.querySelector('.gate1val');
const gate2dis = document.querySelector('.gate2val');
const currentSumDis = document.querySelector('.currentSum');
const constantDis = document.querySelector('.constant');

//gates
const gate1color = document.querySelector('.gate1');
const gate2color = document.querySelector('.gate2');

//next buttons
const nxtBtn = document.querySelector('.nxt');
const noNxtBtn = document.querySelector('.nonxt');

let gate1 = 0;
let gate2 = 0;
let currentSum = 0;
let constant = 0;

function increase(gate){
     switch (gate) {
          case 1:
               gate1++;
               gate1dis.textContent = gate1;
               break;
          case 2:
               gate2++;
               gate2dis.textContent = gate2;
               break;
          default:
               console.log("An error occurred. Check the ''increase function'' in script.js")
               break;
     }
     updateGTs()
}

function decrease(gate){
     switch (gate) {
          case 1:
               gate1--;
               gate1dis.textContent = gate1;
               break;
          case 2:
               gate2--;
               gate2dis.textContent = gate2;
               break;
          default:
               console.log("An error occurred. Check the ''increase function'' in script.js")
               break;
     }
     updateGTs()
}

function updateGTs(){
     if(gate1 != 0 && (gate1 % 3) === 0){
          gate1color.style.backgroundColor = "green";
     }
     else{
          gate1color.style.backgroundColor = "red";
     }
     if(gate2 != 0 && (gate2 % 5) === 0){
          gate2color.style.backgroundColor = "green";
     }
     else{
          gate2color.style.backgroundColor = "red";
     }

     currentSum = gate1 + gate2 + constant;
     currentSumDis.textContent = currentSum;

     if(currentSum === 10 && gate1 != 0 && (gate1 % 3) === 0 && gate2 != 0 && (gate2 % 5) === 0){
          nxtBtn.style.display = "inline";
          noNxtBtn.style.display = "none";
     }
     else{
          nxtBtn.style.display = "none";
          noNxtBtn.style.display = "inline";
     }

     gate1dis.textContent = gate1;
     gate2dis.textContent = gate2;
     constantDis.textContent = constant;
}

function nextLVL() {
     randomize()
     gate1 = 0;
     gate2 = 0;
     updateGTs();
}

//randomize-er
function randomize(){
     let gate1store;
     let gate2store;
     do {
          gate1store = randomNumberDivisibleByX(3);
          gate2store = randomNumberDivisibleByX(5);
          constant = randomNumberDivisibleByX(1);
     } while (constant + gate1store + gate2store !== 10 || Math.abs(gate1store) === Math.abs(constant)|| Math.abs(gate2store) === Math.abs(constant))

     console.log(gate1store);
     console.log(gate2store);
     console.log(constant);

     constantDis.textContent = constant;
     updateGTs();
}

function randomNumberDivisibleByX(divisibility) {
  var randomNumber;

  do {
    randomNumber = Math.floor(Math.random() * 21) - 10;
  } while (randomNumber % divisibility !== 0 || randomNumber === 0);

  return randomNumber;
}

//CUSTOM FIRST LEVEL
constant = 2;
constantDis.textContent = constant;
updateGTs()