const main = document.getElementById("main");
const userContainer = document.getElementById("usersContainer");
const addUserBtn = document.getElementById("add-user");
const doubleMoneyBtn = document.getElementById("double-money");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortRichestBtn = document.getElementById("sort-richest");
const calculateWealthBtn = document.getElementById("calculate-wealth");

function capFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateName = () => {
  const names = [
    "Aaron",
    "Patricia",
    "Larry",
    "Linda",
    "Mary",
    "Jacob",
    "Ryan",
    "Rachel",
    "Stephanie",
    "Jack",
    "Dora",
    "Brian",
  ];

  const name = capFirst(names[getRandomInt(0, names.length)]);
  return name;
};

const generateSurname = () => {
  const surnames = [
    "Thompson",
    "Robinson",
    "Harris",
    "Turner",
    "Markou",
    "Morris",
    "Simpson",
    "Marshall",
    "Cooper",
    "Rodermark",
    "Frank",
    "Gates",
  ];

  const surname = capFirst(surnames[getRandomInt(0, surnames.length)]);
  return surname;
};

const generateNetWorth = () => {
  return Math.floor(Math.random() * 1000000);
};

let users = [
  {
    name: generateName(),
    surname: generateSurname(),
    networth: generateNetWorth(),
  },
  {
    name: generateName(),
    surname: generateSurname(),
    networth: generateNetWorth(),
  },
  {
    name: generateName(),
    surname: generateSurname(),
    networth: generateNetWorth(),
  },
];

const addNewUserToState = () => {
  let newUser = { name: "", surname: "", networth: 0 };
  newUser.name = generateName();
  newUser.surname = generateSurname();
  newUser.networth = generateNetWorth();

  users.push(newUser);
  return newUser;
};

function updateTotal() {
  const totalWealthElement = document.getElementById("totalWealthContainer");
  if (totalWealthElement) {
    calculateWealth();
  }
}

function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

const showAllUserToUI = (users) => {
  users.forEach((user) => {
    createAndAddUserDOMElement(user);
  });
};

const createAndAddUserDOMElement = (user) => {
  const div = document.createElement("div");
  div.classList.add("person");
  div.innerHTML = `<strong>${user.name} ${
    user.surname
  }</strong> <span>${formatMoney(user.networth)}</span>`;

  userContainer.appendChild(div);
};

showAllUserToUI(users);

// Clear The DOM
function updateDOM() {
  userContainer.innerHTML = "";
}

// Double everyones networth
function doubleNetworth() {
  users = users.map((user) => {
    return { ...user, networth: user.networth * 2 };
  });
  updateDOM();
  showAllUserToUI(users);
  updateTotal();
}

// Sort by richest
function sortByRichest() {
  users.sort((a, b) => b.networth - a.networth);
  updateDOM();
  showAllUserToUI(users);
}

// Show Millionaires
function showMillionaires() {
  const usersChildrenList = userContainer.children;
  for (let index = 0; index < usersChildrenList.length; index++) {
    const personContainer = usersChildrenList[index];
    const networthElement = personContainer.children[1];
    const networth = parseFloat(
      networthElement.innerText.split("$").join("").split(",").join("")
    );
    if (networth < 1000000) {
      personContainer.classList.add("d-none");
    } else {
      personContainer.classList.remove("d-none");
    }
  }
}

// Caluclate Entire Wealth
function calculateWealth() {
  const total = users.reduce((acc, user) => (acc += user.networth), 0);

  let oldWealthElement = document.getElementById("totalWealthContainer");
  if (oldWealthElement) {
    oldWealthElement.remove();
  }
  const wealthElement = document.createElement("div");
  wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    total
  )}</strong></h3>`;
  wealthElement.id = "totalWealthContainer";
  main.appendChild(wealthElement);
}

// Add User
addUserBtn.addEventListener("click", (e) => {
  let newUser = addNewUserToState();
  createAndAddUserDOMElement(newUser);
  updateTotal();
});

doubleMoneyBtn.addEventListener("click", doubleNetworth);
sortRichestBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);
