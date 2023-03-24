let casovi = [
  {
    cas: 1,
    start: "07:30:00",
    end: "08:15:00",
  },

  {
    cas: 2,
    start: "08:20:00",
    end: "09:05:00",
  },
  {
    cas: 3,
    start: "09:25:00",
    end: "10:10:00",
  },
  {
    cas: 4,
    start: "10:15:00",
    end: "11:00:00",
  },
  {
    cas: 5,
    start: "11:10:00",
    end: "11:50:00",
  },
  {
    cas: 6,
    start: "11:55:00",
    end: "12:35:00",
  },
  {
    cas: 7,
    start: "12:40:00",
    end: "13:15:00",
  },
  {
    cas: 1,
    start: "13:30:00",
    end: "14:15:00",
  },
  {
    cas: 2,
    start: "14:20:00",
    end: "15:05:00",
  },
  {
    cas: 3,
    start: "15:25:00",
    end: "16:10:00",
  },
  {
    cas: 4,
    start: "16:15:00",
    end: "17:00:00",
  },
  {
    cas: 5,
    start: "17:10:00",
    end: "17:50:00",
  },
  {
    cas: 6,
    start: "17:55:00",
    end: "18:35:00",
  },
  {
    cas: 7,
    start: "18:40:00",
    end: "19:15:00",
  },
];
let casoviSkrPo5 = [
  {
    cas: 1,
    start: "07:30:00",
    end: "08:10:00",
  },

  {
    cas: 2,
    start: "08:15:00",
    end: "08:55:00",
  },
  {
    cas: 3,
    start: "09:15:00",
    end: "09:55:00",
  },
  {
    cas: 4,
    start: "10:00:00",
    end: "10:40:00",
  },
  {
    cas: 5,
    start: "10:50:00",
    end: "11:30:00",
  },
  {
    cas: 6,
    start: "11:35:00",
    end: "12:15:00",
  },
  {
    cas: 7,
    start: "12:20:00",
    end: "13:00:00",
  },
  {
    cas: 1,
    start: "13:30:00",
    end: "14:10:00",
  },
  {
    cas: 2,
    start: "14:15:00",
    end: "14:55:00",
  },
  {
    cas: 3,
    start: "15:15:00",
    end: "15:55:00",
  },
  {
    cas: 4,
    start: "16:00:00",
    end: "16:40:00",
  },
  {
    cas: 5,
    start: "16:50:00",
    end: "17:30:00",
  },
  {
    cas: 6,
    start: "17:35:00",
    end: "18:15:00",
  },
  {
    cas: 7,
    start: "18:20:00",
    end: "19:00:00",
  },
];
let casoviSkrPo10 = [
  {
    cas: 1,
    start: "07:30:00",
    end: "08:05:00",
  },

  {
    cas: 2,
    start: "08:10:00",
    end: "08:45:00",
  },
  {
    cas: 3,
    start: "09:05:00",
    end: "09:40:00",
  },
  {
    cas: 4,
    start: "09:45:00",
    end: "10:20:00",
  },
  {
    cas: 5,
    start: "10:30:00",
    end: "11:05:00",
  },
  {
    cas: 6,
    start: "11:10:00",
    end: "11:45:00",
  },
  {
    cas: 7,
    start: "11:50:00",
    end: "12:25:00",
  },
  {
    cas: 1,
    start: "13:30:00",
    end: "14:05:00",
  },
  {
    cas: 2,
    start: "14:10:00",
    end: "14:45:00",
  },
  {
    cas: 3,
    start: "15:05:00",
    end: "15:40:00",
  },
  {
    cas: 4,
    start: "15:45:00",
    end: "16:20:00",
  },
  {
    cas: 5,
    start: "16:25:00",
    end: "17:00:00",
  },
  {
    cas: 6,
    start: "17:05:00",
    end: "17:40:00",
  },
  {
    cas: 7,
    start: "17:45:00",
    end: "18:20:00",
  },
];
let counter;
let currentCas;
let videoFlag = 1;
function init(hours) {
  counter = setInterval(function () {
    let date = new Date();
    let fulltime = date.getTime();
    let month = date.toLocaleString("default", { month: "short" });

    let day = date.getDate();

    let year = date.getFullYear();

    let midnight = new Date(`${month} ${day}, ${year} 00:00:00`).getTime();

    let currentTime = fulltime - midnight;

    let casoviInMilisecons = hours.map((item) => {
      let container = {};
      container.cas = item.cas;
      container.start =
        new Date(`${month} ${day}, ${year} ${item.start}`).getTime() - midnight;
      container.end =
        new Date(`${month} ${day}, ${year} ${item.end}`).getTime() - midnight;
      return container;
    });

    let currentCas = casoviInMilisecons.find((cas) => {
      return currentTime >= Number(cas.start) && currentTime <= Number(cas.end);
    });

    if (currentCas) {
      let diff = currentCas.end - currentTime;

      let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      let seconds = Math.floor((diff % (1000 * 60)) / 1000);

      casPause.innerHTML = `ЧАС-${currentCas.cas}`;
      minutesEl.textContent = minutes >= 10 ? minutes : `0${minutes}`;
      secondsEl.innerHTML = seconds >= 10 ? seconds : `0${seconds}`;

      if (minutes <= 1 && diff > 0) {
        if (videoFlag == 1) {
          playVideo();
        }
      } else if (diff <= 0) {
        displayPause();
      }
    } else {
      // stopVideo();
      // form.classList.remove("hide");
      displayPause();
    }
  }, 1000);
}

function displayPause() {
  casPause.innerHTML = "ПАУЗА";
}
// function playVideo() {
//   videoFlag = 0;

//   frame.innerHTML = `<video width="100%" height="100%" autoplay muted controls id="video">
//     <source src="../MladenDelic.mp4" type="video/mp4" />
//   </video>`;
// }
// function stopVideo() {
//   frame.innerHTML = "";
//   videoFlag = 1;
// }
function randomNubmer(num) {
  return Math.floor(Math.random() * num);
}
async function playVideo() {
  videoFlag = 0;
  let videoUrlArray = await window.versions.readData("videos");
  let video = videoUrlArray[randomNubmer(videoUrlArray.length)];
  let proxiWin = window.open(video);
  setTimeout(() => {
    proxiWin.close();
    videoFlag = 1;
  }, 180000);
}

const minutesEl = document.querySelector(".min");
const secondsEl = document.querySelector(".sec");
const casPause = document.querySelector(".cas-pauza");

const frame = document.querySelector(".frame");
const formCounter = document.querySelector(".form");
const radioEl1 = document.querySelector("#c1");
const counterWraper = document.querySelector(".counter-wraper");

const closeCounter = document.querySelector(".counter-wraper .close-count");
const minCounter = document.querySelector(".counter-wraper .min-count");
const maxCounter = document.querySelector(".counter-wraper .max-count");
const youtubeBtn = document.querySelector(".youtube-btn");
const counterInputUrl = document.querySelector(".counter-input-url");
const closeBtn = document.querySelector(".counter-input-url .url-close-btn");
const saveUrl = document.querySelector(".save-url-btn");
const errorEl = document.querySelector(".error");
const videoUrlInput = document.querySelector(".video-url-input");

radioEl1.checked = "true";

init(casovi);
formCounter.addEventListener("change", () => {
  clearInterval(counter);
  if (formCounter.hourLength.value == "10") {
    init(casoviSkrPo10);
  } else if (formCounter.hourLength.value == "5") {
    init(casoviSkrPo5);
  } else init(casovi);
});
maxCounter.addEventListener("click", () => {
  counterWraper.classList.add("max-wraper");
});
minCounter.addEventListener("click", () => {
  counterWraper.classList.remove("max-wraper");
});
closeCounter.addEventListener("click", () => {
  counterWraper.style.display = "none";
});
youtubeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  counterInputUrl.classList.add("show-input-url");
  // console.log("zdravo");
});
closeBtn.addEventListener("click", () => {
  counterInputUrl.classList.remove("show-input-url");
});
saveUrl.addEventListener("click", async () => {
  if (videoUrlInput == "") {
    errorEl.textContent = "Внесете урл на видео!";
    ретурн;
  }
  let res = await window.versions.checkFileExist("videos");

  if (!res) {
    await window.versions.writeFile({
      file: "videos",
      d: [videoUrlInput.value],
    });
  } else {
    let urlVideos = await window.versions.readData("videos");

    urlVideos.push(videoUrlInput.value);
    videoUrlInput.value = "";
    await window.versions.writeFile({
      file: "videos",
      d: urlVideos,
    });
  }
});
