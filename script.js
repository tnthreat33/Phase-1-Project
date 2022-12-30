document.addEventListener("DOMContentLoaded", ()=>{
    //URL for the API for jokes
    const cleanJokeAPI = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist,sexist,explicit";
    const allJokeAPI = "https://v2.jokeapi.dev/joke/Any?amount=10"
   
    //add eventListener to Click for Today's Joke button
    const form = document.querySelector(".form");
    form.addEventListener('click', (e)=>{
        e.preventDefault();
       return joke();
    });

   //Fetching Joke for API to be added as button response 
function joke (){
    fetch(cleanJokeAPI)
    .then(res => res.json())
    .then((joke) => {
        const p = document.querySelector(".joke_paragraph");
        p.textContent = joke.setup;
        const a = document.querySelector(".joke_answer");
        setTimeout(()=> {return  a.textContent = joke.delivery}, 5000 );
        form.disabled = true;
    });
}

//fetching jokes for dropdown depending on the category 
function dropdown() {
    // get the selected category from the dropdown menu
    const select = document.querySelector("#categories");
    const selectedCategory = select.value;

    // element to hold the additional jokes
    const holder = document.querySelector(".additional_jokes");

    // fetch jokes from the API
    fetch(allJokeAPI)
      .then((res) => res.json())
      .then((jokes) => {
        // check if jokes is an array or an object
        if (Array.isArray(jokes)) {
          // filter the jokes based on the selected category
          const matchingJokes = jokes
            .filter((joke) => joke.category === selectedCategory)
            .slice(0, 10); // only display the first 10 jokes

          // create a string with the setup and delivery of each joke
          const jokesString = matchingJokes
            .map((joke) => `${joke.setup} ${joke.delivery}`)
            .join("\n");

          // update textContent of holder element with the jokes string
          holder.textContent = jokesString;
        } else {
          // if jokes is not an array, assume it's a single joke object
          const joke = jokes;
          const matchingJokes = [joke];

          // create a string with the setup and delivery of the joke
          const jokeString = `${joke.setup} ${joke.delivery}`;

          // update textContent of holder element with the joke string
          holder.textContent = jokeString;
        }
      });
  }

  // create eventListener for dropdown
  const select = document.querySelector("#categories");
  select.addEventListener("change", dropdown);
});
   

