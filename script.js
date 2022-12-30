document.addEventListener("DOMContentLoaded", ()=>{

    const jokeAPI = "https://v2.jokeapi.dev/joke/Any?format=txt";

    const form = document.querySelector(".form");
    form.addEventListener('submit', (e)=>{
        e.preventDefault();
       console.log(joke());
    });

function joke (){
    fetch(jokeAPI)
    .then(res => res.json())
    .then((joke) => {
        const p = document.querySelector(".joke-paragraph");
        p.textContent = joke;
    });
}



})