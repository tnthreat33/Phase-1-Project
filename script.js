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
  // fetch jokes from API
  fetch(allJokeAPI)
    // parse the response as JSON
    .then((res) => res.json())
    .then((data) => {
      // select the element where the jokes will be displayed
      const holder = document.querySelector(".additional_jokes");
      // clear the element's content
      holder.innerHTML = ""; 

      // get the selected category from the dropdown
      const selectedCategory = select.value;
      // use the filter method to create a new array of jokes that match the selected category and have a type of "twopart"
      const jokes = data.jokes.filter((joke) => {
        return joke.category === selectedCategory && joke.type === "twopart";
      });

      // check if the jokes array is empty
      if (jokes.length > 0) {
        // display the jokes
        jokes.forEach((joke) => {
          holder.textContent = joke.setup + " " + joke.delivery;
        });
      } else {
        // display a message if no jokes are available
        holder.textContent = "SORRY!! No jokes available for this selection. You can try again later.";
      }
    });
}

// create eventListener for dropdown
const select = document.querySelector("#categories");
select.addEventListener("change", dropdown);


});

   

