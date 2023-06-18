const suits = ['bubny', 'chervy', 'picki', 'trefy']
const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Валет', 'Дама', 'Король', 'Туз']

const deck = new Array()
const players = new Array()

const createDeck = () => {
    for(let c = 0; c < cards.length; c++) {
        for(let s = 0; s < suits.length; s++) {
            let weight = parseInt(cards[c])
            if(cards[c] === 'Валет' || cards[c] === 'Дама' || cards[c] === 'Король') {
                weight = 10
            }
            if(cards[c] === 'Туз') {
                weight = 11
            } 
            const card = {Value: cards[c], Suit: suits[s], Weight:weight}
            deck.push(card)
        }
    }
    return deck
}

const shuffle =() => {
    for(let i = 0; i < 1000; i++) {
        let location1 = Math.floor((Math.random() * deck.length))
        let location2 = Math.floor((Math.random() * deck.length))
        let tmp = deck[location1]

        deck[location1] = deck[location2]
        deck[location2] = tmp
    }
}


const createPlayers = (num) => {
    for(let i = 1; i < num; i++) {
        const hand = new Array()
        const player = {Name:'Vladimir', ID: i, Points: 0, Hand: hand}
        players.push(player)
    }
}


//создание пользовательского интерфейса 
const createPlayersUI = () => {
    document.getElementById('players').innerHTML = ''

    for(let i = 0; i < players.length; i++) {
        const div_player = document.createElement('div')
        const div_playerid = document.createElement('div')
        const div_hand = document.createElement('div')
        const div_points = document.createElement('div')

        div_points.className = 'points'
        div_points.id = 'points_' + i
        div_player.id = 'player_' + i
        div_player.className = 'player'
        div_hand.id = 'hand_' + i

        div_playerid.innerHTML = 'Player ' + players[i].ID
        div_player.appendChild(div_playerid)
        div_player.appendChild(div_hand)
        div_player.appendChild(div_points)

        document.getElementById('players').appendChild(div_player)
        
    }
  
    
}


