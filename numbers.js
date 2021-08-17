const BASE_URL = "http://numbersapi.com"
const favFacts = document.querySelector('.fav-facts')
const multiFacts = document.querySelector('.multi-facts')
const facts = document.querySelector('.facts')

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

get(BASE_URL + '/13/trivia?json')
    .then(res => {
        let li = document.createElement('li')
        li.append(res.data.text)
        favFacts.append(li)
    })
    .catch(err => {
        console.log("ERROR!", err)
    })

get(BASE_URL + '/1..10?json')
    .then(res => {
        for(let val of Object.values(res.data)){
            let li = document.createElement('li')
            li.append(val)
            facts.append(li)
        }
    })
    .catch(err => {
        console.log('ERROR!', err)
    })
    
get(BASE_URL + '/13/trivia?json')
    .then(res => {
        let li = document.createElement('li')
        li.append(res.data.text)
        multiFacts.append(li)
        return get(BASE_URL + '/13/trivia?json')
    })
    .then(res => {
        let li = document.createElement('li')
        li.append(res.data.text)
        multiFacts.append(li)
        return get(BASE_URL + '/13/trivia?json')
    })
    .then(res => {
        let li = document.createElement('li')
        li.append(res.data.text)
        multiFacts.append(li)
        return get(BASE_URL + '/13/trivia?json')
    })
    .then(res => {
        let li = document.createElement('li')
        li.append(res.data.text)
        multiFacts.append(li)
        return get(BASE_URL + '/13/trivia?json')
    })
    .catch(err => {
        console.log("ERROR!", err)
    })