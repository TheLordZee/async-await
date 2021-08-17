const BASE_URL = 'http://deckofcardsapi.com/api/'
const cardBtn = document.querySelector('#get-card')
const stack = document.querySelector('#stack')
const counter = document.querySelector('#count')
let count = 0;
let deckId;

function get(url){
    const request = new XMLHttpRequest();
    return new Promise((resolve, reject) =>{
        request.onload = function(){
            if(request.readyState !== 4) return;
        
            if(request.status >= 200 && request.status < 300){
                resolve({
                    data: JSON.parse(request.response),
                    status: request.status,
                    request: request
                })
            }else{
                reject({
                    msg:"Server Error",
                    status:request.status,
                    request: request
                })
            }
        }
        
        request.onerror = function handleError(){
            reject("NETWORK ERROR!")
            request = null;
        };
        
        request.open('GET', url)    
        request.send()        
    })
}

function getDeck(){
    return get(BASE_URL + 'deck/new/shuffle/?deck_count=1')
    .then(res => {
        deckId = res.data.deck_id;
        return deckId;
    })
    .catch(err => {
        console.log('ERROR!', err)
    })
}

cardBtn.onclick = function(){
    get(`${BASE_URL}deck/${deckId}/draw`)
        .then(res => {
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
        })
        .catch(err => {
            console.log('ERROR!', err)
        })
}

getDeck()
    .then(id => {
        let card1 = get(`${BASE_URL}deck/${id}/draw`)
        let card2 = get(`${BASE_URL}deck/${id}/draw`)
        let consoleCards = [card1, card2]
        Promise.all(consoleCards)
        .then(cardArr => {
            for(let key in Object.keys(cardArr)){
                let cardData = cardArr[key].data.cards[0] 
                console.log(cardData.value,'of', cardData.suit)
            }
        })
        .catch(err => {
            console.log("ERROR!",err)
        })
    })



getDeck()