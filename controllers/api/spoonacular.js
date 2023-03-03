require('dotenv').config();
const axios = require('axios');

// const recipeByIngredientArray = [];


//get recipe by ingredient
//need to make this a function
const recipeByIngredient = {
  method: 'GET',
  url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
  params: {
    //required param
    //I dont think I am targeting this right at all
    ingredients: `${findRecipe.field1}`,
    //optional params
    //Number: The maximal number of recipes to return (default = 5).
    number: '5',
    //ignorePantry: Whether to ignore pantry ingredients such as water, salt, flour etc..
    ignorePantry: 'true',
    ranking: '1'
  },
  headers: {
    'X-RapidAPI-Key': `${process.env.RAPIDAPI_KEY}`,
    'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
  }
};

axios.request(recipeByIngredient).then(function (response) {
  //parse data to get it into a variable
  const instance = JSON.parse(response);
  //set it to an array
  var recipeByIngredientArray = [];

  instance.response.forEach(function(recipe) {
    //push each instance into the array
    recipeByIngredientArray.push(findRecipe(recipe.id));
  });
  return recipeByIngredient.all(recipeByIngredientArray)
    
})
//this grabs the instructions from the recipe route above
function findRecipe(id) {
  var options = {
    method: 'GET',
    url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipe.id}/information`,
    headers: {
      'X-RapidAPI-Key': `${process.env.RAPIDAPI_KEY}`,
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
  };
axios.request(options).then(function (response) {
  console.log(response.data);
  return request(response)
	
}).catch(function (error) {
	console.error(error);
});
}




//get random food joke
const getJoke = {
  method: 'GET',
  url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/jokes/random',
  headers: {
    'X-RapidAPI-Key': `${process.env.RAPIDAPI_KEY}`,
    'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
  }
};

axios.request(getJoke).then(function (response) {
  const instance = response.data

  jokeArray.push(instance)
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});

//get random food trivia
const getFoodTrivia = {
  method: 'GET',
  url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/trivia/random',
  headers: {
    'X-RapidAPI-Key': `${process.env.RAPIDAPI_KEY}`,
    'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
  }
};

axios.request(getFoodTrivia).then(function getTrivia(response) {
  const trivia = response.data.stringify()
	console.log(trivia);
}).catch(function (error) {
	console.error(error);
});

//should we export the arrays here?
module.exports = {recipeByIngredient, jokeArray, trivia}