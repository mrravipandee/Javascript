let [milliSec, sec, min, hou] = [0, 0, 0, 0];

let timeRef = document.querySelector(".times");

let int = null;

document.getElementById("start").addEventListener("click", () => {
  if (int !== null) {
    clearInterval(int);
  }
  int = setInterval(displayTime, 10);
});

document.getElementById("pause").addEventListener("click", () => {
  clearInterval(int);
});

document.getElementById("reset").addEventListener("click", () => {
  clearInterval(int);
  [milliSec, sec, min, hou] = [0, 0, 0, 0];
  timeRef.innerHTML = "00 : 00 : 00 : 00";
});

function displayTime() {
  milliSec += 10;
  if (milliSec >= 1000) {
    milliSec = 0;
    sec++;
    if (sec == 60) {
      sec = 0;
      min++;
      if (min == 60) {
        min = 0;
        hou++;
      }
    }
  }

  let h = hou < 10 ? "0" + hou : hou;
  let m = min < 10 ? "0" + min : min;
  let s = sec < 10 ? "0" + sec : sec;
  let ms =
    milliSec < 10
      ? "00" + milliSec
      : milliSec < 100
      ? "0" + milliSec
      : milliSec;

  timeRef.innerHTML = `${h} : ${m} : ${s} : ${ms}`;
}
