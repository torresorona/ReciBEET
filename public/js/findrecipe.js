// const getRecipesByIngredients = require('../../utils/spoonacular')

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
    joinedIngredients = joinedIngredients.trim();
    const encodedIngredients = encodeURIComponent(joinedIngredients);
    
    const response = await fetch(`/api/recipe/findrecipe?passedIngredients=${encodedIngredients}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
        console.log("Response from findrecipe JS");
        const data = await response.json();
        console.log(data);
        
        for (i = 0; i < data.length; i++) {
            let recipe = data[i];
            console.log(recipe);
            let recipeAnchor = document.createElement('a');
            recipeAnchor.textContent = recipe.title;
            recipeAnchor.setAttribute('href', recipe.url);
            recipeAnchor.setAttribute('class', "p-2 list-group-item rounded-pill text-black bg-warning m-2 col-8")
            recipeAnchor.setAttribute('target', "_blank");

        
            let saveRecipe = document.createElement('button');
            saveRecipe.textContent = "SAVE ♥";
            saveRecipe.setAttribute('class', "btn btn-outline-dark m-2 col-2")

            let recipesResults = document.querySelector('.recipes-results');
            recipesResults.appendChild(recipeAnchor);
            recipesResults.appendChild(saveRecipe);
        }

      } else {
        alert(response.statusText);
      }

}

document.querySelector('#input-ingredients').addEventListener('submit', ingredientsFormHandler);