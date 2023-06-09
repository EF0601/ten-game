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
let solved = 0;
let ultimateSum = 10;
let hinted = 0;
let speedrun = false;

let shortGate1 = 3;
let shortGate2 = 5;
let shortConstant = 2;

function increase(gate) {
     switch (gate) {
          case 1:
               gate1 = gate1 + 3;
               gate1dis.textContent = gate1;
               break;
          case 2:
               gate2 = gate2 + 5;
               gate2dis.textContent = gate2;
               break;
          default:
               console.log("An error occurred. Check the ''increase function'' in script.js");
               break;
     }
     updateGTs();
}

function decrease(gate) {
     switch (gate) {
          case 1:
               gate1 = gate1 - 3;
               gate1dis.textContent = gate1;
               break;
          case 2:
               gate2 = gate2 - 5;
               gate2dis.textContent = gate2;
               break;
          default:
               console.log("An error occurred. Check the ''increase function'' in script.js");
               break;
     }
     updateGTs();
}

function updateGTs() {
     if (gate1 != 0 && (gate1 % 3) === 0) {
          gate1color.style.backgroundColor = "green";
     }
     else {
          gate1color.style.backgroundColor = "red";
     }
     if (gate2 != 0 && (gate2 % 5) === 0) {
          gate2color.style.backgroundColor = "green";
     }
     else {
          gate2color.style.backgroundColor = "red";
     }

     currentSum = gate1 + gate2 + constant;
     currentSumDis.textContent = currentSum;

     if (currentSum === ultimateSum && gate1 != 0 && (gate1 % 3) === 0 && gate2 != 0 && (gate2 % 5) === 0) {
          nxtBtn.style.display = "inline";
          noNxtBtn.style.display = "none";
     }
     else {
          nxtBtn.style.display = "none";
          noNxtBtn.style.display = "inline";
     }

     gate1dis.textContent = gate1;
     gate2dis.textContent = gate2;
     constantDis.textContent = constant;
}

function nextLVL() {
     if (speedrun != true) {
          solved++;
          document.querySelector('.solved').textContent = solved;
          document.querySelector('.hints').textContent = "Not shown";
          randomize();
          gate1 = 0;
          gate2 = 0;
          updateGTs();
          stopStopwatch();
          setTimeout(startStopwatch, 1000);
     }
     if(speedrun === true){
          if (solved != 15) {
               solved++;
               document.querySelector('.solved').textContent = solved;
               document.querySelector('.hints').textContent = "Not available";
               randomize();
               gate1 = 0;
               gate2 = 0;
               updateGTs();
          }
          if (solved == 15) {
               stopStopwatch();
          }
     }
}

//randomize-er
function randomize() {
     let gate1store;
     let gate2store;
     do {
          gate1store = randomNumberDivisibleByX(3);
          gate2store = randomNumberDivisibleByX(5);
          constant = randomNumberDivisibleByX(1);
     } while (constant + gate1store + gate2store !== ultimateSum || Math.abs(gate1store) === Math.abs(constant) || Math.abs(gate2store) === Math.abs(constant) || Math.abs(gate1store) === Math.abs(shortGate1) || Math.abs(gate2store) === Math.abs(shortGate2) || Math.abs(constant) === Math.abs(shortConstant));

     console.log(gate1store);
     console.log(gate2store);
     console.log(constant);

     if ((Math.floor(Math.random() * 2) + 1) === 1) {
          hinted = gate1store;
     } else {
          hinted = gate2store;
     }

     shortGate1 = gate1store;
     shortGate2 = gate2store;
     shortConstant = constant;

     constantDis.textContent = constant;
     updateGTs();
}

function randomNumberDivisibleByX(divisibility) {
     var randomNumber;

     do {
          randomNumber = Math.floor(Math.random() * (ultimateSum * 4)) - (ultimateSum * 2);
     } while (randomNumber % divisibility !== 0 || randomNumber === 0);

     return randomNumber;
}

//stop watch
var startTime;
var running = false;

function startStopwatch() {
     if (!running) {
          startTime = new Date().getTime() - 1000;
          running = true;
          console.log("Stopwatch started.");

          // Update the time display every second
          setInterval(updateStopwatchTime, 10);
     } else {
          console.log("Stopwatch is already running.");
     }
}

function updateStopwatchTime() {
     if (running) {
          var currentTime = new Date().getTime();
          var elapsedTime = (currentTime - startTime) / 1000; // Convert to seconds
          //    elapsedTime = Math.round(elapsedTime);

          // Update the HTML element with the elapsed time
          document.querySelector(".stopwatch").textContent = elapsedTime.toFixed(2) + " seconds";
     }
}

function stopStopwatch() {
     if (running) {
          var endTime = new Date().getTime();
          var elapsedTime = (endTime - startTime) / 1000; // Convert to seconds
          running = false;
          console.log("Stopwatch stopped. Elapsed time: " + elapsedTime.toFixed(2) + " seconds.");

          // Update the HTML element with the final elapsed time
          document.querySelector(".stopwatch").textContent = elapsedTime.toFixed(2) + " seconds";
     } else {
          console.log("Stopwatch is not running.");
     }
}

function resets(_type) {
     switch (_type) {
          case 2:
               nextLVL();
               solved--;
               document.querySelector('.solved').textContent = solved;
               break;

          case 1:

               nextLVL();
               solved = 0;
               // solved--;
               document.querySelector('.solved').textContent = solved;
               break;
          default:
               console.log("error with reset!");
               break;

     }
     document.querySelector('.resets').textContent = "This game has been reset/hinted!";
     document.getElementById("myModal").style.display = "none";
}

function ultimate() {
     ultimateSum = 25;
     nextLVL();
     solved--;
     document.querySelector('.solved').textContent = solved;
     document.getElementById("myModal").style.display = "none";
}

function norm(speeds) {
     if (speeds === false && speedrun != true) {
          ultimateSum = 10;
          nextLVL();
          solved--;
          document.querySelector('.solved').textContent = solved;
          document.getElementById("myModal").style.display = "none";
          speedrun = false;
     }
     if (speeds === false && speedrun != false) {
          speedrun = false;
          norm(false);
     }
     if (speeds === true) {
          ultimateSum = 10;
          nextLVL();
          solved--;
          document.querySelector('.solved').textContent = solved;
          document.getElementById("myModal").style.display = "none";
     }
}

function speed(){
     norm(true);
     speedrun = true;
}

function hint() {
     if (speedrun != true) {
          document.querySelector('.hints').textContent = hinted;
          document.querySelector('.resets').textContent = "Hint/reset was used!";
     }
}

//CUSTOM FIRST LEVEL
setTimeout(startStopwatch, 1000);
hinted = 5;
constant = 2;
constantDis.textContent = constant;
updateGTs();
