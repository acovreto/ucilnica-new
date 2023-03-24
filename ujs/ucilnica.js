const td = document.querySelector("td");
const h2 = document.querySelector(".container-header2 h2");
const tableStudents = document.querySelector(".table-students");
const tableBody = document.querySelector("tbody");
const tableHead = document.querySelector("thead");
const btn = document.querySelector(".btn");
const submitBtn = document.querySelector(".submit-btn");
const form = document.querySelector("form");
const predmet = document.querySelector(".predmet");
const close = document.querySelector("#close");
const header = document.querySelector(".header");
const classHeader = document.querySelector(".class-header");
const randomStudent = document.querySelector(".random-student");
const modalContainer = document.querySelector(".modal-container");
const tableContainer = document.querySelector(".table-container");
const ucenik = document.querySelector(".ucenik");
const modalOpen = document.querySelector("#sign-in");
const toggle = document.querySelector(".toggle");
const body = document.querySelector("body");
const headerText = document.querySelector(".header-text");
const signIn = document.querySelector("#sign-in");
const signOut = document.querySelector("#sign-out");
const home = document.querySelector(".home");
const studentTable = document.querySelector(".student-table");
const tajmer = document.querySelector(".tajmer");
const modalUcilnici = document.querySelector(".modal-ucilnici");
const modalUcilniciWraper = document.querySelector(".modal-ucilnici-wraper");
const closeUcilniciBtn = document.querySelector(".close-ucilnici-btn");

let allInputs;

// classHeader.innerHTML = localStorage.getItem("class");

let profesor;
let classNum;
let brojUcenici;
let listStudentsData;
let classes = [
  {
    name: "I-1",
    students: `1. Биџос Хадис
    2. Дуртаноски Филип
    3. Јованоски Давид
    4. Јорданоски Димитар
    5. Котоски Владимир
    6. Куртиши Блерон
    7. Лазороски Христијан
    8. Лолески Стефан
    9. Лошкоски Александар
    10. Митески Бошко
    11. Наумоски Мартин Ристе
    12. Наумоски Мартин Ристо
    13. Недески Матео
    14. Петрески Никола
    15. Печој Димитрија
    16. Ризвановиќ Трајче
    17. Ристески Никола
    18. Рустем Саид
    19. Сиљаноски Христијан
    20. Симоноски Златко
    21. Стојковски Никола
    22. Трпоски Бојан
    23. Хасан Асан`,
  },
  {
    name: "I-5",
    students: `1. Ангелески Андреј
    2. Арслан Елвир
    3. Атанасов Филип
    4. Бошкоски Антонио
    5. Бутески Јован
    6. Дине Адријан
    7. Дукадиновска Емануела
    8. Дуноски Михаил
    9. Ѓоргиески Ѓорѓи
    10. Илијоски Антонио
    11. Јакимовски Даријан
    12. Јованоски Стефан
    13. Наумовски Максим
    14. Неданоски Христијан
    15. Огненоски Јован
    16. Огненоски Кристијан
    17. Ристески Наум
    18. Ристоски Христијан
    19. Синадиноски Благоја
    20. Скрчески Бошко
    21. Стојановска Теона
    22. Толоманоски Давор
    23. Чулчески Илија`,
  },
  {
    name: "III-3",
    students: `1. Апостоловски Марко
  2. Бајрам Ален
  3. Бакулески Дамјан
  4. Гиноски Јован
  5. Димитријески Мартин
  6. Димоски Димитар
  7. Дуклески Александар
  8. Ѓорѓиески Андреј
  9. Ѓоршески Виктор
  10. Ѓоршески Марио
  11. Завојчевски Илија
  12. Здравковиќ Владимир
  13. Иловски Бојан
  14. Јовчески Иво
  15. Кочески Бобан
  16. Марков Марио
  17. Марков Никола
  18. Маркоска Марта
  19. Маркоски Јован
  20. Модева Климентина
  21. Настески Виктор
  22. Павлески Марио
  23. Петрески Кристијан
  24. Попов Виктор
  25. Сејдиноски Ерен
  26. Трпески Александар
  27. Тупаноски Јорданчо
  28. Цаноски Христијан
  29. Цацаноски Андреј
  30. Целески Христијан`,
  },
  {
    name: "III-4",
    students: `1. Башукоски Даниел
    2. Блажески Виктор
    3. Вучетиќ Дејан
    4. Димоска Емилија
    5. Илијевска Софија
    6. Јузмески Мартин
    7. Каланоски Никола
    8. Колушоски Филип
    9. Кочоски Христијан
    10. Кутаноски Драган
    11. Маџар Марино
    12. Милошоски Горазд
    13. Митревски Наум
    14. Настовски Марко
    15. Новеска Ана
    16. Палитов Стефан
    17. Палитова Сара
    18. Петрески Давор
    19. Речкоски Наум
    20. Рушан Енис
    21. Симоновски Давид
    22. Симоноски Мартин
    23. Смилевски Владимир
    24. Србакоски Христијан
    25. Стефаноски Петар
    26. Стојанов Благојче
    27. Стрезовска Бојана
    28. Танаскоски Петар
    29. Трифуновски Филип
    30. Трпески Антониј
    31. Целески Никола`,
  },
  {
    name: "I-4",
    students: `1. Богојовски Благоја
    2. Брдароска Марија
    3. Гугоски Филип
    4. Димиќ Лука
    5. Донев Стефан
    6. Донески Филип
    7. Ѓорески Климент
    8. Јанески Виктор
    9. Јованоски Бојан
    10. Јованчев Андреј
    11. Јоноска Кети
    12. Каланоски Владимир
    13. Крстаноски Дарко
    14. Кузманоска Јана
    15. Мајкиќ Мартин
    16. Маркоски Марио
    17. Мешкоски Андреј
    18. Митревски Христијан
    19. Мургоски Славчо
    20. Мурџоски Борјан
    21. Новаков Павел
    22. Палоски Бојан
    23. Попоски Марко
    24. Ристевски Мартин
    25. Савиќ Андреа
    26. Стевановски Стефан
    27. Стојаноски Александар
    28. Тасеска Мелани
    29. Тодороски Лука
    30. Толески Борис
    31. Трифуноски Кристијан
    32. Трпески Бојан`,
  },
  {
    name: "I-3",
    students: `1. Андоноски Антонио
    2. Апостоловски Михаил
    3. Бандулиев Бојан
    4. Велкоски Димитар
    5. Вељановски Боби
    6. Гиноски Дејан
    7. Деспотоски Леон
    8. Димоски Марко
    9. Ѓоршески Бојан
    10. Ѓулејиќ Дарко
    11. Калаческа Маријана
    12. Камнароски Александар
    13. Кироски Андреј
    14. Костадиноски Јоаким
    15. Костески Христијан
    16. Кочоски Петар
    17. Курто Леонид
    18. Манговски Филип Атанас
    19. Мирчески Давид
    20. Наумоски Климент
    21. Раковиќ Марко
    22. Сандрески Андреј
    23. Саревски Јован
    24. Спасеска Маја
    25. Стевоски Марко
    26. Стефаноска Анабела
    27. Стефаноски Филип
    28. Стојаноска Александра
    29. Стојаноски Васил
    30. Хаџиев Константин
    31. Цветаноски Петар
    32. Цоцески Марко`,
  },
  {
    name: "I-2",
    students: `1. Влавчески Благоја
    2. Илоска Злата
    3. Илоска Јана
    4. Илоска Сара
    5. Јанески Мартин
    6. Јанески Михаил
    7. Јовановски Петар
    8. Карајованоски Матеј
    9. Митрески Стефан
    10. Ончев Никола
    11. Паришовски-Мишевски Благојче
    12. Радески Давид
    13. Размоски Дамјан
    14. Секулоски Ненад
    15. Тасески Давид
    16. Тасиќ Марија
    17. Чорбески Филип`,
  },
];

const imgIII3 = ["https://randomuser.me/api/portraits/men/5.jpg"];
// toggle.disabled = true;
const profNum = [
  "6",
  "21",
  "25",
  "32",
  "37",
  "42",
  "47",
  "50",
  "51",
  "81",
  "36",
];
const predmeti = [
  "ОДС",
  "ПУ",
  "СПОРТ",
  "ООП",
  "МАКДОНСКИ",
  "АНГЛИСКИ",
  "УВС",
  "МАТЕМАТИКА",
  "ВЕБ-ПРОГРАМИРАЊЕ",
  "САУ",
  "ПРАКСА",
  "ОМ",
];
const passwords = [
  "prof",
  "prof",
  "prof",
  "prof",
  "prof",
  "prof",
  "prof",
  "prof",
  "prof",
  "prof",
  "prof",
];
const classesNames = [
  {
    godina: "Прва Година",
    class: ["I-1", "I-2", "I-3", "I-4", "I-5", "I-A", "I-B", "I-C", "I-K"],
  },
  {
    godina: "Втора Година",
    class: [
      "II-1",
      "II-2",
      "II-3",
      "II-4",
      "II-5",
      "II-A",
      "II-B",
      "II-C",
      "II-K",
    ],
  },
  {
    godina: "Трета Година",
    class: [
      "III-1",
      "III-2",
      "III-3",
      "III-4",
      "III-5",
      "III-A",
      "III-B",
      "III-C",
      "III-K",
    ],
  },
  {
    godina: "Четврта Година",
    class: [
      "VI-1",
      "VI-2",
      "VI-3",
      "VI-4",
      "VI-5",
      "VI-A",
      "VI-B",
      "VI-C",
      "VI-K",
    ],
  },
];

// -----------------display table function------------
let fileExist;
async function checkFileExist(path) {
  let fExist = await window.versions.checkFileExist(path);
  return fExist;
}

async function studentsData(path) {
  let resdata = await window.versions.readData(path);
  return resdata;
}
function displayTableStudents() {
  tableBody.innerHTML = "";
  tableHead.innerHTML = "";
  tableStudents.classList.add("show-table");

  let html = ``;

  listStudentsData.forEach((item, index) => {
    let html1 = ``;
    let html0 = ``;
    tableHead.innerHTML = `<tr>
    <th>Име и Презиме</th>
    <th>Оцена</th>
    <th>Оцена</th>
    <th>Оцена</th>
    <th>Оцена</th>
    <th>Оцена</th>
    <th>Оцена</th>
    <th>Оцена</th>
    <th>Оцена</th>
    <th>Оцена</th>
    <th>Оцена</th>
    <th><button class="close-btn" id="close">
    <i class="fa fa-times"></i>
  </button></th>
  </tr>`;
    html0 = `<tr><td>${index + 1}.${item.student}</td>`;

    item.oceni.forEach((oce, index) => {
      html1 += `<td><input class="ocena-input" type="text" name="ocena${index}" value="${
        oce ? oce : ""
      }" /></td> `;
    });
    html1 += `<td><button class="btn btn-zacuvaj">зачувај</button></td></tr>`;
    html += html0 + html1;
  });

  tableBody.insertAdjacentHTML("afterbegin", html);
  allInputs = document.querySelectorAll(".ocena-input");
}
modalOpen.addEventListener("click", (e) => {
  modalContainer.classList.add("show-modal");
});

function showModalUcilniciList() {
  modalUcilnici.innerHTML = "";
  let html = ``;
  classesNames.forEach((year) => {
    let html0 = ``;
    year.class.forEach((c) => {
      html0 += `<th><button class="btn-class">${c}</button><th>`;
    });
    html += `<tr><th>${year.godina}</th>${html0}</tr>`;
  });

  modalUcilnici.insertAdjacentHTML("afterbegin", html);
  modalUcilniciWraper.classList.add("show-ucilnici");
}
// ---------------show table students-------------
modalUcilnici.addEventListener("click", async (e) => {
  if (e.target.nodeName == "BUTTON") {
    classNum = e.target.textContent;

    headerText.textContent = "";

    classHeader.innerHTML = classNum;
    // ---------------------------------------
    let path = `classes/class${classNum.split("-").join("")}_${profesor}.json`;
    let fExists = await window.versions.checkFileExist(path);
    console.log(fExists);
    if (!fExists) {
      let ucilnica = classes.find((k) => k.name == classNum);
      if (!ucilnica) {
        console.log("Nema takov klas!");
      } else {
        console.log(ucilnica);
        let listStudents = [];
        ucilnica.students.split("\n").forEach((student) => {
          let s1 = student.split(".");
          listStudents.push(s1[1].trim());
        });
        let klas = [];
        listStudents.forEach((student) => {
          klas.push({
            student,
            oceni: ["", "", "", "", "", "", "", "", "", ""],
          });
        });
        let fileAndData = {
          file: path,
          d: klas,
        };
        let res = await window.versions.writeFile(fileAndData);
        console.log(res);
      }
    }

    listStudentsData = await window.versions.readData(path);
    console.log(listStudentsData);
    brojUcenici = listStudentsData.length;
    modalUcilniciWraper.classList.remove("show-ucilnici");
    tableStudents.classList.add("show-table");
    displayTableStudents(listStudentsData);
    createCards(classNum, profesor);
  } else return;
});
// --------------get class---------------------
const dropdownList = document.querySelector(".ucilnica-dropdown");
const clasNumbHeader = document.querySelector(".class-number-header");

let formFill;
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(form.broj.value, form.password.value);
  if (form.broj.value && form.password.value) {
    if (
      profNum.includes(form.broj.value) &&
      form.password.value == passwords[profNum.indexOf(form.broj.value)]
    ) {
      console.log("ok");
      profesor = form.broj.value;
      formFill = true;
      signIn.classList.remove("show-btn");
      signOut.classList.add("show-btn");
      headerText.textContent = "Добре дојдовте во училница";
      form.broj.value = "";
      form.password.value = "";
      modalContainer.classList.remove("show-modal");
      modalContainer.style.display = "none";
      showModalUcilniciList();
    } else {
      console.log("no");
      return;
    }
  } else {
    return;
  }
});
// -------------Sign out---------------
signOut.addEventListener("click", (e) => {
  window.location.reload();
});
// ---------toggle button------------
toggle.addEventListener("click", (e) => {
  e.preventDefault();

  let ls = localStorage.getItem("formFill");

  if (ls == "true") {
    body.classList.toggle("show-nav");
  }
});
// ------------home button--------------
// home.addEventListener("click", (e) => {
//   e.preventDefault();
//   body.classList.remove("show-nav");
//   window.location.assign("index.html");
// });

tableBody.addEventListener("click", async (e) => {
  if (e.target.nodeName == "BUTTON") {
    let path = `classes/class${classNum.split("-").join("")}_${profesor}.json`;
    let row = e.target.closest("tr");
    let ime = row
      .querySelector("td:first-child")
      .textContent.split(".")
      .filter((el) => el.length > 3);
    console.log(ime);
    let tableRowInput = row.querySelectorAll("td input");

    let oceRow = [];
    tableRowInput.forEach((el) => {
      oceRow.push(el.value);
    });
    console.log(oceRow);
    let index = listStudentsData.findIndex((obj) => obj.student == ime);
    listStudentsData[index].oceni = oceRow;

    let fileAndData = {
      file: path,
      d: listStudentsData,
    };
    let res = await window.versions.writeFile(fileAndData);
    console.log("Податоците се зачувани!", res);
  }
  return false;
});

close.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.setItem("formFill", false);
  modalContainer.classList.remove("show-modal");
});
// --------------closing table--------------
tableHead.addEventListener("click", (e) => {
  e.preventDefault();

  if (e.target.nodeName == "I") {
    table.classList.remove("show-table");
  }
});
closeUcilniciBtn.addEventListener("click", () => {
  modalUcilniciWraper.style.display = "none";
});

window.addEventListener("load", (e) => {
  modalContainer.classList.add("show-modal");
});

const cube = document.getElementById("cube");
const sides = [...document.querySelectorAll(".dot")];
const cubeWraper = document.querySelector(".cube-wraper");
const closeCube = document.querySelector(".cube-wraper .close-count");
const minCube = document.querySelector(".cube-wraper .min-count");
const maxCube = document.querySelector(".cube-wraper .max-count");
const nameStudentAll = [...document.querySelectorAll(".name-student")];
console.log(nameStudentAll);

let min = 10;
let max = 24;

cube.onclick = function () {
  let randomArr = [];
  for (let i = 1; i <= 6; i++) {
    randomArr.push(getRandomNum(1, brojUcenici + 1));
  }

  randomArr.forEach((n, i) => {
    sides[i].textContent = `${n}.`;
    if (listStudentsData) {
      nameStudentAll[i].textContent = listStudentsData[n - 1].student;
    }
  });
  let xRand = getRandom(max, min);
  let yRand = getRandom(max, min);

  cube.style.transform = "rotateX(" + xRand + "deg) rotateY(" + yRand + "deg)";
};

function getRandom(max, min) {
  return (Math.floor(Math.random() * (max - min)) + min) * 90;
}
function getRandomNum(max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
}
// randomStudent.addEventListener("click", (e) => {
//   e.preventDefault();
//   cubeWraper.classList.add("min-cube");
//   body.classList.remove("show-nav");
// });

closeCube.addEventListener("click", () => {
  cubeWraper.style.display = "none";
});
minCube.addEventListener("click", () => {
  cubeWraper.classList.add("min-cube-wraper");
});
maxCube.addEventListener("click", () => {
  cubeWraper.classList.remove("min-cube-wraper");
});
