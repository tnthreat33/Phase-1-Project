document.addEventListener("DOMContentLoaded", ()=>{
    //URL for the API for all Jokes in full text form
    const jokeAPI = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist,sexist,explicit";

    //add eventListener to Click for Today's Joke button
    const form = document.querySelector(".form");
    form.addEventListener('click', (e)=>{
        e.preventDefault();
       return joke();
       return jokeAnswer();
    });

   //Fetching Joke for API to be added as button response 
function joke (){
    fetch(jokeAPI)
    .then(res => res.json())
    .then((joke) => {
        const p = document.querySelector(".joke_paragraph");
        p.textContent = joke.setup;
        const a = document.querySelector(".joke_answer");
        setTimeout(()=> {return  a.textContent = joke.delivery}, 5000 )
    });
}

})