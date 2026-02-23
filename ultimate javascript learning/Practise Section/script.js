//inserting adjacent element html and text

// const box = document.querySelector(".box");
// box.insertAdjacentHTML("beforeend", "<div>mk</div>");
// box.insertAdjacentHTML("afterbegin", "<div>mk</div>");
// box.insertAdjacentText("afterbegin", "hello" )

//set timeout and interval

// setTimeout(() => {
//   console.log("hello world");
// }, 8000);

//setInterval
let count = 0;
let mnt = 0;
let hr = 0;
const intervalId = setInterval(() => {
  count++;
  if (count === 60) {
    mnt++;
    count = 0;
  }
  if (mnt === 60) {
    hr++;
    mnt = 0;
  }
  console.log( mnt, ":", hr, ":", count);

}, 1000);

//clear interval
// setTimeout(() => {
//   clearInterval(intervalId);
// }, 20000);