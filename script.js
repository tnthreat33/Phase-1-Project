document.addEventListener("DOMContentLoaded", ()=>{
    //URL for the API for jokes
    const cleanJokeAPI = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist,sexist,explicit";
    const allJokeAPI = "https://v2.jokeapi.dev/joke/Any?amount=10"
   
    //add eventListener to Click for Today's Joke button
    const form = document.querySelector(".form");
    form.addEventListener('click', (e)=>{
        e.preventDefault();
       return joke();
       form.disabled = true;
    });

   //Fetching Joke for API to be added as button response 
function joke (){
    fetch(cleanJokeAPI)
    .then(res => res.json())
    .then((joke) => {
        const p = document.querySelector(".joke_paragraph");
        if(joke.type === "twopart"){
        p.textContent = joke.setup;
        const a = document.querySelector(".joke_answer");
        setTimeout(()=> {return  a.textContent = joke.delivery}, 5000 );
        
        } else {
          p.textContent = joke.joke
        }
        
    });
}

//fetching jokes for dropdown depending on the category 

function dropdown() {
  fetch(allJokeAPI)
    .then((res) => res.json())
    .then((data) => {
      const holder = document.querySelector(".additional_jokes");
      holder.innerHTML = ""; // clear the paragraph's content
      for (const joke of data.jokes) {
        if (select.value === joke.category && joke.type === "twopart") {
          holder.textContent = joke.setup + " " + joke.delivery;
         
        } else if (select.value === joke.category && joke.type === "single"){
          holder.textContent = joke.joke;
        }
      }
    });
}

// create eventListener for dropdown
const select = document.querySelector("#categories");
select.addEventListener("change", dropdown);


  

});

   

