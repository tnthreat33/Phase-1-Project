document.addEventListener("DOMContentLoaded", ()=>{
    
    const cleanJokeAPI = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist,sexist,explicit";
    const allJokeAPI = "https://v2.jokeapi.dev/joke/Any?amount=10"

   
   
    const form = document.querySelector(".form");
    form.addEventListener('click', (e)=>{
        e.preventDefault();
       joke();
       form.disabled = true;
    });

  
function joke (){
  
    fetch(cleanJokeAPI)
    .then(res => res.json())
    .then((joke) => {
      
        const p = document.querySelector(".joke_paragraph");
        
        if(joke.type === "twopart"){
         
        p.textContent = joke.setup;
        
        const answer = document.querySelector(".joke_answer");
        setTimeout(()=> {return  answer.textContent = joke.delivery}, 5000 );
        
        } else {
          
          p.textContent = joke.joke
        }
        
    });
}


function dropdown() {
  
  fetch(allJokeAPI)
    .then((res) => res.json())
    .then((data) => {
      
      const holder = document.querySelector(".additional_jokes");
     
      holder.innerHTML = ""; 

      
      const selectedCategory = select.value;
      
      const jokes = data.jokes.filter((joke) => {
        return joke.category === selectedCategory && joke.type === "twopart";
      });

      
      if (jokes.length > 0) {
        
        jokes.forEach((joke) => {
          holder.textContent = joke.setup + " " + joke.delivery 
        });
      } else {
        holder.textContent = "SORRY!! No jokes available for this selection. You can try again later.";
      }

    });
}


const select = document.querySelector("#categories");
select.addEventListener("change", dropdown);


});

