const BASE_URL = "http://numbersapi.com"
const favFacts = document.querySelector('.fav-facts')
const multiFacts = document.querySelector('.multi-facts')
const facts = document.querySelector('.facts')

async function get(url){
   return (url)   
}

async function getFavFact(){
    let res = await axios.get(BASE_URL + '/13/trivia?json')
    let li = document.createElement('li')
    li.append(res.data.text)
    favFacts.append(li)
}

async function getFacts(){
    let res = await axios.get(BASE_URL + '/1..10?json')
    for(let val of Object.values(res.data)){
        let li = document.createElement('li')
        li.append(val)
        facts.append(li)
    }
}

async function getMultiFacts(){
    let facts = await Promise.all([
        axios.get(BASE_URL + '/13/trivia?json'),
        axios.get(BASE_URL + '/13/trivia?json'),
        axios.get(BASE_URL + '/13/trivia?json'),
        axios.get(BASE_URL + '/13/trivia?json')
    ])
   
    for(let res of facts){
        let li = document.createElement('li')
        li.append(res.data.text)
        multiFacts.append(li)
    }
}

getFavFact()
getFacts()
getMultiFacts()