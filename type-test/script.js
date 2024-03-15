const RANDOMQUOTE_URL = "https://api.quotable.io/random";
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')

quoteInputElement.addEventListener('input', ()=>{
    const arrayQuote = quoteDisplayElement.querySelectorAll('span');
    const arrayValue = quoteInputElement.value.split('')
    let correct = true
    arrayQuote.forEach((characterSpan, index)=>{
        const character = arrayValue[index]
        if(character == null){
            characterSpan.classList.remove('correct');
            characterSpan.classList.remove('incorrect');
            correct = false;
        }else if(character === characterSpan.innerText){
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        }else {
            characterSpan.classList.remove('correct') 
            characterSpan.classList.add('incorrect')
            correct = false;
        }
    })

    if(correct) renderNewQuote();
})

function getRandomQuote() {
    return fetch(RANDOMQUOTE_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => data.content)
        .catch(error => {
            console.error('Error fetching random quote:', error);
            throw error; // rethrow the error to propagate it
        });
}

async function renderNewQuote() {
    try {
        const quote = await getRandomQuote();
        console.log(quote);
        quoteDisplayElement.innerText = '';
        quote.split('').forEach( character => {
            const characterSpan = document.createElement('span')
            characterSpan.innerText = character
            quoteDisplayElement.appendChild(characterSpan)
        });
        quoteInputElement.value = null;
        startTimer();
    } catch (error) {
        console.error('Error getting next quote:', error);
    }
}


let startTime
function startTimer(){
    timerElement.innerText = 0
    startTime = new Date()
    setInterval(() => {
        timer.innerText = getTimerTime()
    }, 1000);
}

function getTimerTime(){
    return Math.floor((new Date() -startTime)/1000 );
}

// Call getNextQuote to get a random quote
renderNewQuote();
