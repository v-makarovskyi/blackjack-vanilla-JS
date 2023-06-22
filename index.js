const suits = ["bubny", "chervy", "picki", "trefy"];
const values = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

let deck = new Array();

let players = new Array();
let currentPlayer = 0;

//Создаем колоду карт для игры
function createDeck() {
  deck = new Array();
  for (let c = 0; c < values.length; c++) {
    for (let s = 0; s < suits.length; s++) {
      var weight = parseInt(values[c]);
      if (values[c] == "J" || values[c] == "Q" || values[c] == "K") weight = 10;
      if (values[c] == "A") weight = 11;
      var card = { Value: values[c], Suit: suits[s], Weight: weight };
      deck.push(card);
    }
  }
  console.log(deck)
}

//Функция создания игроков
function createPlayers(num) {
  players = new Array();
  for (let p = 1; p <= num; p++) {
    const hand = new Array();
    const player = { ID: p, Name: "Player " + p, Points: 0, Hand: hand };
    players.push(player);
  }
}

//Функция для отображения пользовательского интерфейса
function createPlayersUI() {
  document.getElementById("players").innerHTML = "";
  for (let p = 0; p < players.length; p++) {
    const div_player = document.createElement("div");
    const div_playerid = document.createElement("div");
    const div_hand = document.createElement("div");
    const div_points = document.createElement("div");

    div_points.className = "points";
    div_points.id = "points_" + p;
    div_player.id = "player_" + p;
    div_player.className = "player";
    div_hand.id = "hand_" + p;

    div_playerid.innerHTML = 'Player ' + players[p].ID

    div_player.appendChild(div_playerid);
    div_player.appendChild(div_hand);
    div_player.appendChild(div_points);

    document.getElementById("players").appendChild(div_player);
  }
}

//перетасовка колоды
function shuffle() {
  for (let i = 0; i < 1000; i++) {
    let location1 = Math.floor(Math.random() * deck.length);
    let location2 = Math.floor(Math.random() * deck.length);
    let tmp = deck[location1]

    deck[location1] = deck[location2];
    deck[location2] = tmp;
  }
}

//Старт игры
function startBlackjack() {
  document.getElementById("btnStart").value = "Рестарт";
  document.getElementById("status").style.display = "none";
  //Сдаем по 2 карты каждому объекту Player
  currentPlayer = 0;
  createDeck();
  shuffle();
  createPlayers(2);
  createPlayersUI();
  dealHands();
  document.getElementById("player_" + currentPlayer).classList.add("active");
}

function dealHands() {
  //поочередная раздача карт каждому игроку
  //по 2-е карты каждому
    for(let i = 0; i < 2; i++) {
        for(let x = 0; x < players.length; x++) {
            let card = deck.pop()
            players[x].Hand.push(card)
            renderCard(card, x)
            updatePoints()
        }
    }
  updateDeck();
}

//Добавить карту в <div id=`hand_${number}`></div> внутри <div class='player'></div>
function renderCard(card, player) {
    const hand = document.getElementById('hand_' + player)
    hand.appendChild(getCardUI(card))
}

function getCardUI(card) {
  const el = document.createElement("div");
  let icon = "";
  if (card.Suit == "chervy") icon = "♥";
  else if (card.Suit == "picki") icon = "♠";
  else if (card.Suit == "bubny") icon = "♦";
  else icon = "♣";

  el.className = "card";
  el.innerHTML = card.Value + "<br/>" + icon;
  return el;
}

//Функция подсчета общего количества очков игрока
function getPoints(player) {
    let points = 0
    for(let i = 0; i < players[player].Hand.length; i++) {
        points += players[player].Hand[i].Weight
    }
    players[player].Points = points
    return points
}

//Функция обновления общего количества очков игрока
function updatePoints() {
    for(let i = 0; i < players.length; i++) {
        getPoints(i)
        document.getElementById('points_' + i).innerHTML = players[i].Points
    }
}

//Обновление количества карт в коложе после сдачи
function updateDeck() {
  document.getElementById("deckcount").innerHTML = deck.length;
}

window.addEventListener("load", function () {
  createDeck();
  shuffle();
  createPlayers(2);
});
