//Theme changing functiionality
const themeToggle = document.querySelector("#theme-toggle");
// Load saved theme

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeToggle.checked = true;
}

// Toggle theme
themeToggle.addEventListener("change", () => {
  if (themeToggle.checked) {
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
});

// API fetching functionality
const API = "https://dummyjson.com/recipes";
let recipe_names = document.querySelectorAll(".card h1");
let recipe_cuisines = document.querySelectorAll(".cuisine");
let recipe_ratings = document.querySelectorAll(".rating");
let recipe_durations = document.querySelectorAll(".duration");
let recipe_difficulties = document.querySelectorAll(".difficulty");
let recipe_imgs = document.querySelectorAll(".card-img");
const details_btn = document.querySelectorAll(".details");

const getData = async () => {
  let response = await fetch(API);
  let recipe_data = await response.json();
  const used = [];

  for (let i = 0; i < 3; i++) {
    let random_no;
    do {
       random_no = Math.floor(Math.random() * 30);
    } while (used.includes(random_no));
    const recipe = recipe_data.recipes[random_no];
    used.push(random_no);

    const recipe_name = recipe.name;
    const recipe_cuisine = recipe.cuisine;
    const recipe_rating = recipe.rating;
    const recipe_prepTime = recipe.prepTimeMinutes;
    const recipe_cookTime = recipe.cookTimeMinutes;
    const recipe_difficulty = recipe.difficulty;
    const recipe_img = recipe.image;

    recipe_names[i].innerText = recipe_name;
    recipe_cuisines[i].innerText = recipe_cuisine;
    recipe_ratings[i].innerText = recipe_rating + " star";
    recipe_durations[i].innerText = recipe_prepTime + recipe_cookTime + " min";
    recipe_difficulties[i].innerText = recipe_difficulty;
    recipe_imgs[i].src = recipe_img;

    details_btn[i].addEventListener("click", () => {
      showRecipeDetails(recipe);
    });
  }
};

getData();

/* ===========================
   MODAL FUNCTIONALITY
=========================== */

const close_btn = document.querySelector("#closeModalBtn");
let modal = document.querySelector(".modal");
let modal_title = document.querySelector("#modalRecipeTitle");
let modal_img = document.querySelector("#modalRecipeImg");
let modal_ingred = document.querySelector("#modalIngredients");
let modal_instru = document.querySelector("#modalInstructions");
let modal_prep = document.querySelector("#modalPrepTime");
let modal_cook = document.querySelector("#modalCookTime");
let modal_amt = document.querySelector("#modalServingAmt");
let modal_cal = document.querySelector("#modalCal");
let modal_type = document.querySelector("#modalMealType");

const showRecipeDetails = (recipe) => {
  modal_title.innerText = recipe.name;
  modal_img.src = recipe.image;

  modal_ingred.innerHTML = "";
  recipe.ingredients.forEach((ingredient) => {
    const li = document.createElement("li");
    li.innerText = ingredient;
    modal_ingred.appendChild(li);
  });

  modal_instru.innerHTML = "";
  recipe.instructions.forEach((instruct) => {
    const li = document.createElement("li");
    li.innerText = instruct;
    modal_instru.appendChild(li);
  });

  modal_prep.innerText = recipe.prepTimeMinutes + " min";
  modal_cook.innerText = recipe.cookTimeMinutes + " min";
  modal_amt.innerText = recipe.servings + " person";
  modal_cal.innerText = recipe.caloriesPerServing;
  modal_type.innerText = recipe.mealType;
  modal.style.display = "flex";
};

close_btn.addEventListener("click", () => {
  modal.style.display = "none";
});

document.addEventListener("keydown", (event) => {
  if (event.key == "Escape") {
    modal.style.display = "none";
  }
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
/*
// Search recipe functionality
const SEARCH_API = "https://dummyjson.com/recipes/search?q=";
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const query = new FormData(form).get("q");
  const formated_query = (query.toLowerCase().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "));
  
  searchRecipe(formated_query);
});

const searchRecipe = async(query) => {
  let response = await fetch(`${SEARCH_API}${query}`);
  
  let recipe_data = await response.json();
  console.log(recipe_data);
  
}
*/
