const suits = ['bubny', 'chervy', 'picki', 'trefy']
const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Валет', 'Дама', 'Король', 'Туз']

const deck = new Array()

const createDeck = () => {
    const deck = new Array()
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
