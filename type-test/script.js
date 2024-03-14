const RANDOMQUOTE_URL = "https://api.quotable.io/random";

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

async function getNextQuote() {
    try {
        const quote = await getRandomQuote();
        console.log(quote);
    } catch (error) {
        console.error('Error getting next quote:', error);
        // Handle the error as needed
    }
}

// Call getNextQuote to get a random quote
getNextQuote();
