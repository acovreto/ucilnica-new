const cardsContainer = document.getElementById("quiz1-cards-container");
const prevBtn = document.getElementById("quiz1-prev");
const nextBtn = document.getElementById("quiz1-next");
const currentEl = document.getElementById("quiz1-current");
const showBtn = document.getElementById("quiz1-show");
const hideBtn = document.getElementById("quiz1-hide");
const questionEl = document.getElementById("quiz1-question");
const answerEl = document.getElementById("quiz1-answer");
const addCardBtn = document.getElementById("quiz1-add-card");
const clearBtn = document.getElementById("quiz1-clear");
const addContainer = document.getElementById("quiz1-add-container");
const quiz1Container = document.querySelector(".quiz1-container");
const closeQuiz1 = document.querySelector(".quiz1-container .close-count");
const minQuiz1 = document.querySelector(".quiz1-container .min-count");
const maxQuiz1 = document.querySelector(".quiz1-container .max-count");
const quiz1 = document.querySelector(".quiz1");

// Keep track of current card
let cardsData;
// setTimeout(() => {
//   getCardsData().then((res) => {
//     cardsData = res || [];
//   });
//   console.log(cardsData);
//   console.log(classNum);
//   createCards();
// }, 1000);
let currentActiveCard = 0;

// Store DOM cards
const cardsEl = [];

// Store card data

// const cardsData = [
//   {
//     question: 'What must a variable begin with?',
//     answer: 'A letter, $ or _'
//   },
//   {
//     question: 'What is a variable?',
//     answer: 'Container for a piece of data'
//   },
//   {
//     question: 'Example of Case Sensitive Variable',
//     answer: 'thisIsAVariable'
//   }
// ];

// Create all cards
async function createCards(classNb, prof) {
  cardsData = await getCardsData(classNb, prof);

  if (cardsData) {
    cardsData.forEach((data, index) => createCard(data, index));
  } else return;
}

// Create a single card in DOM
function createCard(data, index) {
  const card = document.createElement("div");
  card.classList.add("quiz1-card");

  if (index === 0) {
    card.classList.add("active");
  }

  card.innerHTML = `
  <div class="quiz1-inner-card">
  <div class="quiz1-inner-card-front">
    <p>
      ${data.question}
    </p>
  </div>
  <div class="quiz1-inner-card-back">
    <p>
      ${data.answer}
    </p>
  </div>
</div>
  `;

  card.addEventListener("click", () =>
    card.classList.toggle("quiz1-show-answer")
  );

  // Add to DOM cards
  cardsEl.push(card);

  cardsContainer.appendChild(card);

  updateCurrentText();
}

// Show number of cards
function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

// Get cards from local storage

async function getCardsData(cl, pro) {
  let filePath = `tests/test${cl.split("-").join("")}_${pro}.json`;
  // const cards = JSON.parse(localStorage.getItem("quiz1-cards"));
  let fileExist = await window.versions.checkFileExist(filePath);
  if (fileExist) {
    let cards = await window.versions.readData(filePath);
    return cards === null ? [] : cards;
  }
}

// Add card to local storage
function setCardsData(cards) {
  // localStorage.setItem("quiz1-cards", JSON.stringify(cards));

  let fileAndData = {
    file: `tests/test${classNum.split("-").join("")}_${profesor}.json`,
    d: cards,
  };
  writeData(fileAndData);
}

// Event listeners

// Next button
nextBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "quiz1-card left";

  currentActiveCard = currentActiveCard + 1;

  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = "quiz1-card active";

  updateCurrentText();
});

// Prev button
prevBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "quiz1-card quiz1-right";

  currentActiveCard = currentActiveCard - 1;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = "quiz1-card active";

  updateCurrentText();
});

// Show add container
showBtn.addEventListener("click", () =>
  addContainer.classList.add("quiz1-show")
);
// Hide add container
hideBtn.addEventListener("click", () =>
  addContainer.classList.remove("quiz1-show")
);

// Add new card
addCardBtn.addEventListener("click", async () => {
  let filePath = `tests/test${classNum.split("-").join("")}_${profesor}.json`;
  let fileExist = await window.versions.checkFileExist(filePath);
  let cards = [];
  if (fileExist) {
    cards = await window.versions.readData(filePath);
  }
  const question = questionEl.value;
  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };

    createCard(newCard);

    questionEl.value = "";
    answerEl.value = "";

    // quiz1Container.style.display = "flex";

    cards.push(newCard);
    setCardsData(cards);
    addContainer.classList.remove("quiz1-show");
  }
});

// Clear cards button
clearBtn.addEventListener("click", () => {
  console.log("zdravo");
  localStorage.removeItem("quiz1-cards");
  window.location.reload();
  alert("Прашањата се избришани!");

  cardsContainer.textContent = "";
});
maxQuiz1.addEventListener("click", () => {
  quiz1Container.classList.remove("display-min-quiz1");
});
minQuiz1.addEventListener("click", () => {
  quiz1Container.classList.add("display-min-quiz1");
});
closeQuiz1.addEventListener("click", () => {
  quiz1Container.style.display = "none";
});
// quiz1.addEventListener("click", (e) => {
//   e.preventDefault();
//   quiz1Container.style.display = "flex";

//   body.classList.remove("show-nav");
// });
