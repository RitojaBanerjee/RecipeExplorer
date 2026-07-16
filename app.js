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
let recipe_cuisines = document.querySelectorAll(".cuisine")
let recipe_ratings = document.querySelectorAll(".rating")
let recipe_preptimes = document.querySelectorAll(".duration")
let recipe_difficulties = document.querySelectorAll(".difficulty")
let recipe_imgs = document.querySelectorAll(".card-img")


const getData = async () => {
  let response = await fetch(API);
  let recipe_data = await response.json();

  for (let i = 0; i < 3; i++) {
    const random_no = Math.floor(Math.random() * 30);
    const recipe = recipe_data.recipes[random_no];

    console.log(recipe);
    
    const recipe_name = recipe.name;
    const recipe_cuisine = recipe.cuisine;
    const recipe_rating = recipe.rating;
    const recipe_prepTime = recipe.prepTimeMinutes;
    const recipe_difficulty = recipe.difficulty;
    const recipe_img = recipe.image;

    recipe_names[i].innerText = recipe_name;
    recipe_cuisines[i].innerText = recipe_cuisine;
    recipe_ratings[i].innerText = recipe_rating;
    recipe_preptimes[i].innerText = recipe_prepTime;
    recipe_difficulties[i].innerText = recipe_difficulty;
    recipe_imgs[i].src = recipe_img
  }
};

getData();
