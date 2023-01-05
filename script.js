document.addEventListener("DOMContentLoaded", ()=>{
    //URL for the API for jokes
    const cleanJokeAPI = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist,sexist,explicit";
    const allJokeAPI = "https://v2.jokeapi.dev/joke/Any?amount=10"
   
    //add eventListener to Click for Today's Joke button
    const form = document.querySelector(".form");
    form.addEventListener('click', (e)=>{
        e.preventDefault();
       joke();
       form.disabled = true;
    });

   //Fetching Joke for API to be added as button response 
function joke (){
  //fetch joke from API
    fetch(cleanJokeAPI)
    .then(res => res.json())
    .then((joke) => {
      //select where it will be displayed 
        const p = document.querySelector(".joke_paragraph");
        //if it is a two part joke 
        if(joke.type === "twopart"){
          //display the joke
        p.textContent = joke.setup;
        //where to display the answer
        const answer = document.querySelector(".joke_answer");
        setTimeout(()=> {return  answer.textContent = joke.delivery}, 5000 );
        
        } else {
          //if it is a one part joke
          p.textContent = joke.joke
        }
        
    });
}

//fetching jokes for dropdown depending on the category 
function dropdown() {
  // fetch jokes from API
  fetch(allJokeAPI)
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

//search box function 
function search(keyword) {
  fetch(allJokeAPI)
    .then((res) => res.json())
    .then((data) => {
      const holder = document.querySelector(".additional_jokes");
      // clear the element's content
      holder.innerHTML = ""; 
      // convert the data object into an array
      const jokesArray = Object.values(data);
      // filter the jokes array to include only jokes with the keyword in the setup or delivery
      const matchingJokes = jokesArray.filter((joke) => joke.setup && joke.delivery && (joke.setup.includes(keyword) || joke.delivery.includes(keyword)));
      // return the setup and delivery of each matching joke
      if (matchingJokes.length > 0) {
        matchingJokes.forEach((joke) => {
          holder.innerHTML += `${joke.setup} ${joke.delivery}<br>`;
        });
      } else {
        // return a message if no jokes are found
        holder.textContent = "Sorry, no jokes found with the keyword " + keyword;
      }
    });
}


// create event listener for search
const searchInput = document.querySelector("#search");
searchInput.addEventListener("input", (event) => {
  // get the value of the input field
  const keyword = event.target.value;
  // call the search function with the keyword
  search(keyword);
});



});

