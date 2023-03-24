let quiz2QuestionsAnswers;
function shuffleArray(array) {
  if (array === [] || array) {
    quiz2QuestionEl.textContent =
      "Квизот нема податоци! Внесете прашања и одговори!";
    return;
  }
  let curId = array.length;

  while (0 !== curId) {
    // Pick a remaining element
    let randId = Math.floor(Math.random() * curId);
    curId -= 1;
    // Swap it with the current element.
    let tmp = array[curId];
    array[curId] = array[randId];
    array[randId] = tmp;
  }
  return array;
}

function checkAnswer(e) {
  if (
    e.target.textContent[0] == quiz2QuestionsAnswers[curentQuestion].correct
  ) {
    e.target.style.backgroundColor = "green";
    e.target.style.color = "#fafaf9";
    scoreEl.textContent = Number(scoreEl.textContent) + 1;
  } else {
    e.target.style.backgroundColor = "red";
    e.target.style.color = "#fafaf9";
  }

  answers.forEach((answer) => answer.removeEventListener("click", checkAnswer));
  finish.removeAttribute("disabled");
}

function listaUcenici(lista) {
  let listaUcenici = lista.split("\n");
  let html = ``;
  listaUcenici.forEach((ucenik) => {
    html = `<li>${ucenik}</li>`;
    ol.insertAdjacentHTML("beforeend", html);
  });
}
function initQuiz2() {
  console.log(quiz2QuestionsAnswers);
  console.log(curentQuestion);

  if (quiz2QuestionsAnswers.length == 0) {
    quiz2QuestionEl.textContent =
      "Квизот нема податоци! Внесете прашања и одговори!";
    return;
  }
  answers.forEach((answer) => {
    answer.style.backgroundColor = "#44403c";
    answer.style.color = "#fafaf9";
    answer.style.fontSize = "2rem";
  });
  questionCount.textContent = Number(questionCount.textContent) + 1;
  quiz2QuestionEl.textContent = quiz2QuestionsAnswers[curentQuestion].question;
  answers[0].textContent = `a) ${quiz2QuestionsAnswers[curentQuestion].a}`;
  answers[1].textContent = `b) ${quiz2QuestionsAnswers[curentQuestion].b}`;
  answers[2].textContent = `c) ${quiz2QuestionsAnswers[curentQuestion].c}`;
  answers[3].textContent = `d) ${quiz2QuestionsAnswers[curentQuestion].d}`;
  answers.forEach((answer) => answer.addEventListener("click", checkAnswer));
}
// let quizLenth = quiz2QuestionsAnswers.length;
let curentQuestion = 0;

const quiz2QuestionEl = document.querySelector(".quiz2-question");
const answers = document.querySelectorAll(".quiz2-answer-show");
const scoreEl = document.querySelector(".quiz2-score-count");
const questionCount = document.querySelector(".quiz2-question-count");
const allQuestionsEl = document.querySelector(".quiz2-all-questions");
const addQuestionWraper = document.querySelector(".quiz2-questions-wraper");
const ol = document.querySelector("ol");
const quiz2start = document.querySelector(".quiz2-start");

const finish = document.querySelector(".quiz2-finish");
finish.setAttribute("disabled", "");
const btnHide = document.querySelector(".quiz2-btn-hide");
quizSaveQuestion = document.querySelector("#quiz2-save-question");
const quiz2NextBtn = document.querySelector(".quiz2-next");
quiz2NextBtn.setAttribute("disabled", "");
const quiz2Container = document.querySelector(".quiz2-container");
const quiz2Form = document.querySelector(".quiz2-form");
const textareaQuiz2 = document.querySelectorAll("textarea.quiz2-answer");
const addQuestion = document.querySelector("#quiz2-add-question");
const closeQuiz2 = document.querySelector(".quiz2-container .close-count");
const minQuiz2 = document.querySelector(".quiz2-container .min-count");
const maxQuiz2 = document.querySelector(".quiz2-container .max-count");
const quiz2Clear = document.querySelector(".quiz2-clear");
const quiz2Error = document.querySelector(".quiz2-error");
const quiz2Open = document.querySelector(".quiz2");
const quiz2Delete = document.querySelector(".quiz2-delete");

quiz2start.addEventListener("click", async (e) => {
  console.log(quiz2QuestionsAnswers);
  if (!quiz2QuestionsAnswers) {
    let path = `tests_quiz_2/test${classNum
      .split("-")
      .join("")}_${profesor}.json`;
    let fileExist = await window.versions.checkFileExist(path);
    if (fileExist) {
      quiz2QuestionsAnswers = await window.versions.readData(path);
    } else {
      quiz2QuestionsAnswers = [];
      let fileAndData = { file: path, d: quiz2QuestionsAnswers };
      await window.versions.writeFile(fileAndData);
    }
  }
  quiz2NextBtn.removeAttribute("disabled");

  scoreEl.textContent = 0;
  questionCount.textContent = 0;
  console.log(curentQuestion, quiz2QuestionsAnswers.length);
  if (curentQuestion == quiz2QuestionsAnswers.length) {
    curentQuestion = 0;
  }
  console.log(curentQuestion);
  // shuffleArray(quiz2QuestionsAnswers);

  initQuiz2();
});
function nextQues(e) {
  e.preventDefault();
  finish.setAttribute("disabled", "");
  quiz2start.setAttribute("disabled", "");
  curentQuestion++;
  if (curentQuestion == quiz2QuestionsAnswers.length) {
    curentQuestion = 0;
    questionCount.textContent = 0;
  }
  // shuffleArray(quiz2QuestionsAnswers);
  initQuiz2();
}
quiz2NextBtn.addEventListener("click", nextQues);
finish.addEventListener("click", (e) => {
  e.preventDefault();
  quiz2start.removeAttribute("disabled");
  quiz2NextBtn.setAttribute("disabled", "");
  quiz2QuestionEl.textContent = `Ученикот одговори точно на ${scoreEl.textContent} од ${questionCount.textContent} прашање`;
  answers.forEach((answer) => {
    answer.textContent = "";
    answer.style.backgroundColor = "#44403c";
  });
  if (curentQuestion == quiz2QuestionsAnswers.length - 1) {
    curentQuestion = 0;
  } else {
    curentQuestion++;
  }
});
const quiz2Correct = document.querySelectorAll(".quiz2-correct-answer input");

quiz2Correct.forEach((el) => {
  el.addEventListener("checked", (el) => {});
});

btnHide.addEventListener("click", (e) => {
  e.preventDefault();
  addQuestionWraper.classList.remove("show-wraper");
  answers.forEach((answer) => {
    answer.textContent = "";
    answer.style.backgroundColor = "#44403c";
  });
});
addQuestion.addEventListener("click", (e) => {
  e.preventDefault();
  addQuestionWraper.classList.add("show-wraper");
});
closeQuiz2.addEventListener("click", (e) => {
  e.preventDefault();
  quiz2Container.style.display = "none";
});
minQuiz2.addEventListener("click", (e) => {
  e.preventDefault();
  quiz2Container.classList.add("min-quiz2-container");
});
maxQuiz2.addEventListener("click", (e) => {
  e.preventDefault();
  quiz2Container.classList.remove("min-quiz2-container");
});
quiz2Clear.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("quiz2");
  alert("Квизот нема прашања!");
  // window.location.reload();
});

quiz2Delete.addEventListener("click", async () => {
  console.log(curentQuestion);
  console.log(quiz2QuestionsAnswers);
  let quiz2QuestionsAnswersNew = quiz2QuestionsAnswers.filter(
    (item, i) => i !== curentQuestion
  );
  console.log(quiz2QuestionsAnswersNew);
  let path = `tests_quiz_2/test${classNum
    .split("-")
    .join("")}_${profesor}.json`;
  let fileAndData = { file: path, d: quiz2QuestionsAnswersNew };
  await window.versions.writeFile(fileAndData);
  if (quiz2QuestionsAnswersNew === []) {
    quiz2QuestionEl.textContent =
      "Квизот нема податоци! Внесете прашања и одговори!";
    // finish.click();
    return;
  } else {
    quiz2QuestionsAnswers = [...quiz2QuestionsAnswersNew];
    console.log(quiz2QuestionsAnswers);
    // finish.click();
    // shuffleArray(quiz2QuestionsAnswers);
    if (quiz2QuestionsAnswers.length == 1) {
      curentQuestion = 0;
    }
    initQuiz2();
  }
});
