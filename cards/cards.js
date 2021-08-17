const BASE_URL = 'http://deckofcardsapi.com/api/'
const cardBtn = document.querySelector('#get-card')
const stack = document.querySelector('#stack')
const counter = document.querySelector('#count')
let count = 0;
let deckId;

async function getDeck(){
    let res = await axios.get(BASE_URL + 'deck/new/shuffle/?deck_count=1')
    deckId = res.data.deck_id;
    return deckId;
}

cardBtn.onclick = async function(){
    let res = await axios.get(`${BASE_URL}deck/${deckId}/draw`)
    if(count === 52){
        getDeck();
        stack.innerHTML = '';
        count = 0;
        counter.innerHTML = count;
    }
    let cardData = res.data.cards[0]
    let card = document.createElement('img')
    console.log(cardData.value, cardData.suit)
    card.src = cardData.image
    let rot = Math.floor(Math.random() * 360)
    card.style.transform = `rotate(${rot}deg)`
    stack.append(card)
    count++;
    counter.innerHTML = count;
}

async function consoleCards(){
    let id = await getDeck()
    let cardArr = await  Promise.all([
        axios.get(`${BASE_URL}deck/${id}/draw`), 
        axios.get(`${BASE_URL}deck/${id}/draw`)
    ])
 
    for(let key in Object.keys(cardArr)){
        let cardData = cardArr[key].data.cards[0] 
        console.log(cardData.value,'of', cardData.suit)
    }

}

consoleCards()
getDeck()