const recipeByIngredients = require("./spoonacular.js")

const ingredientsFormHandler = async (event) => {
    event.preventDefault();

    const ingredients = document.querySelectorAll('.ingredient')

    let ingredientsArray = [];

    for (let i = 0; i < ingredients.length; i++) {
        let ingredient = ingredients.item(i).value.trim();
        if (ingredient && ingredient != '') {
            ingredientsArray.push(ingredient);
        }
    }

    let joinedIngredients = ingredientsArray.join(",");

    
    let foundRecipes = recipeByIngredients(joinedIngredients);
    
    const response = await fetch('/findrecipe', {
        method: 'GET',
        body: JSON.stringify(foundRecipes),
        headers: { 'Content-Type': 'application/json' },
    })
    if (response.ok) {
        // If successful, redirect the browser to the profile page
        console.log(response);
      } else {
        alert(response.statusText);
      }

}

document
  .querySelector('.ingredients-form')
  .addEventListener('submit', ingredientsFormHandler);