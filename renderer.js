// const information = document.getElementById("info");
// information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;
const writeData = async (tekst) => {
  const response = await window.versions.writeFile(tekst);
  return response;
};

// func();

// const readTest = async () => {
//   let response = await window.versions.readData("test.json");

//   let dataArray = [...response];

//   return dataArray;
// };
let quizSaveQuestion = document.querySelector("#quiz2-save-question");
quizSaveQuestion.addEventListener("click", async () => {
  let path = `tests_quiz_2/test${classNum
    .split("-")
    .join("")}_${profesor}.json`;
  let fExists;
  // checkFileExist(path).then((res) => {
  //   fExists = res;
  //   console.log(fExists);
  // });
  fExists = await window.versions.checkFileExist(path);

  if (fExists) {
    quiz2QuestionsAnswers = await window.versions.readData(path);
    console.log(quiz2QuestionsAnswers);
  } else {
    quiz2QuestionsAnswers = [];
  }
  let answers = [];

  textareaQuiz2.forEach((el) => {
    answers.push(el.value);
    el.value = "";
  });
  let qAndA = {
    question: quiz2Form.questionQuiz2.value,
    a: answers[0],
    b: answers[1],
    c: answers[2],
    d: answers[3],
    correct: quiz2Form.correct.value,
  };
  document.querySelectorAll("input[type='radio']").forEach((el) => {
    el.checked = false;
  });
  await quiz2QuestionsAnswers.push(qAndA);
  console.log("podatoci", quiz2QuestionsAnswers);
  quiz2Form.questionQuiz2.value = "";
  let fileAndData = { file: path, d: quiz2QuestionsAnswers };
  writeData(fileAndData);
});
const readTestData = async (path) => {
  let res = await window.versions.readData(path);

  return res;
};
// readTestData(path).then((res) => {
//   quiz2QuestionsAnswers = res;
// });
