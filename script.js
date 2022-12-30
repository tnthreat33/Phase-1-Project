document.addEventListener("DOMContentLoaded", ()=>{
    //URL for the API for all Jokes in full text form
    const jokeAPI = "https://v2.jokeapi.dev/joke/Any?format=txt";

    //add eventListener to Click for Today's Joke button
    const form = document.querySelector(".form");
    form.addEventListener('click', (e)=>{
        e.preventDefault();
       return joke();
    });

   //Fetching Joke for API to be added as button response 
function joke (){
    fetch(jokeAPI)
    .then(res => res.text())
    .then((joke) => {
        const p = document.querySelector(".joke_paragraph");
        p.textContent = joke;
    });
}



})